// Copyright 2026 Conan McNicholl. Fragments Local Use License, see LICENSE.
// Packaging adapter only: verify copied bytes, then run the canonical read-only CLI. Written so any old Node can read it
// (no arrow functions, template strings, destructuring or `node:` imports): on one too old for the engine, it says so.
'use strict';
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

function sha(bytes) { return crypto.createHash('sha256').update(bytes).digest('hex'); }
// The turn hooks' state folder, as the server finds it (runtime/drift-mcp.ts, hookStateDir).
function stateDir() {
  var env = process.env;
  return path.resolve(env.FRAGMENTS_STATE || env.CLAUDE_PLUGIN_DATA || env.PLUGIN_DATA || path.join(require('os').homedir(), '.fragments', 'agent-state'));
}

/** A Node too old for the engine: a server with no tools, whose instructions and first hook that can carry words to the
 * agent (the prompt's, or else the first edit's) say why, so the agent can tell the person. Inside a Fragments turn, the
 * app's own hooks speak, and this says nothing. */
function serveOff(said) {
  var hosted = process.env.FRAGMENTS_HOSTED === '1', told = hosted, held = '';
  function send(message) { message.jsonrpc = '2.0'; process.stdout.write(JSON.stringify(message) + '\n'); }
  function answer(message) {
    if (!message || typeof message !== 'object' || message.id === undefined || message.id === null) return;
    var params = message.params || {}, id = message.id;
    if (message.method === 'initialize') return send({ id: id, result: { protocolVersion: typeof params.protocolVersion === 'string' ? params.protocolVersion : '2025-06-18', capabilities: { tools: {} }, serverInfo: { name: 'fragments-drift', version: '0' }, instructions: hosted ? '' : said + ' Tell the person once.' } });
    if (message.method === 'tools/list') return send({ id: id, result: { tools: [] } });
    if (message.method === 'ping') return send({ id: id, result: {} });
    if (message.method !== 'tools/call') return send({ id: id, error: { code: -32601, message: said } });
    var name = params.name, event = name === 'hook_prompt' ? 'UserPromptSubmit' : name === 'hook_post' ? 'PostToolUse' : '', text = '';
    if (/^hook_(prompt|pre|post|stop)$/.test(name)) {
      if (event && !told) { told = true; text = JSON.stringify({ hookSpecificOutput: { hookEventName: event, additionalContext: said + ' Tell the person once, in those words.' } }); }
      return send({ id: id, result: { content: [{ type: 'text', text: text }] } });
    }
    send({ id: id, result: { content: [{ type: 'text', text: said }], isError: true } });
  }
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (chunk) {
    held += chunk;
    for (var end = held.indexOf('\n'); end >= 0; end = held.indexOf('\n')) {
      var line = held.slice(0, end);
      held = held.slice(end + 1);
      try { answer(JSON.parse(line)); } catch (error) { /* not a message */ }
    }
  });
  process.stderr.write('Fragments plugin: ' + said + '\n');
}

/** Node's compile cache, in the state folder, for this server and the workers it starts (they read it from the
 * environment). A cache that can't be written only makes the start slower. */
function compileCache() {
  try {
    var mod = require('module'), dir = path.join(stateDir(), 'compile-cache');
    if (typeof mod.enableCompileCache !== 'function') return;
    var result = mod.enableCompileCache(dir), statuses = mod.constants && mod.constants.compileCacheStatus;
    if (result && statuses && (result.status === statuses.ENABLED || result.status === statuses.ALREADY_ENABLED)) process.env.NODE_COMPILE_CACHE = result.directory || dir;
  } catch (error) { /* slower, not broken */ }
}

function main() {
  var root = fs.realpathSync(path.join(__dirname, '..'));
  var args = process.argv.slice(2);
  if (args.length !== 2 || args[0] !== '--receipt-sha256' || !/^[a-f0-9]{64}$/.test(args[1])) throw new Error('Launch through the generated MCP configuration; its build receipt is required.');
  function read(relative) {
    if (typeof relative !== 'string' || path.isAbsolute(relative) || relative.split(/[\\/]/).some(function (part) { return !part || part === '.' || part === '..'; })) throw new Error('Invalid packaged path: ' + relative);
    var file = root;
    relative.split('/').forEach(function (part) {
      file = path.join(file, part);
      if (fs.lstatSync(file).isSymbolicLink()) throw new Error('Symlinked packaged artifact: ' + relative);
    });
    var resolved = fs.realpathSync(file);
    if (resolved.indexOf(root + path.sep) !== 0 || !fs.statSync(resolved).isFile()) throw new Error('Packaged artifact is outside the plugin: ' + relative);
    return fs.readFileSync(resolved);
  }
  var bytes = read('PLUGIN_BUILD.json');
  if (sha(bytes) !== args[1]) throw new Error('Plugin build receipt changed. Regenerate and reinstall the reviewed plugin.');
  var receipt = JSON.parse(bytes);
  // The plugin's name is the build's (local or public); the receipt itself is pinned by its hash. BUILD.json is read at
  // run time: it names the project checker this release writes (runtime/contract-state.ts, checkEdition).
  var required = ['binding.json', 'assets/launch.cjs', 'engine/dist/cli.cjs', 'engine/dist/BUILD.json', 'engine/LICENSE', 'LICENSE', 'THIRD_PARTY_NOTICES.txt'];
  if (receipt.schema !== 'fragments-local-plugin/1' || typeof receipt.name !== 'string' || !receipt.name || !receipt.files || !required.every(function (file) { return receipt.files[file]; })) throw new Error('Plugin build receipt is incomplete.');
  Object.keys(receipt.files).forEach(function (file) {
    if (sha(read(file)) !== receipt.files[file]) throw new Error('Packaged artifact changed: ' + file + '. Regenerate and reinstall the reviewed plugin.');
  });
  var binding = JSON.parse(read('binding.json'));
  // "session": one install for every project; the server finds the one each session is in.
  if (binding.schema !== 'fragments-plugin-binding/1' || binding.profile !== 'read' || typeof binding.project !== 'string' || !(binding.project === 'session' || path.isAbsolute(binding.project))) throw new Error('Invalid read-only project binding.');
  var project = '--session';
  if (binding.project !== 'session') {
    project = fs.realpathSync(binding.project);
    if (project !== binding.project || !fs.statSync(project).isDirectory()) throw new Error('The bound project moved or became a symlink. Regenerate the plugin for its new real path.');
  }
  var cli = path.join(root, 'engine/dist/cli.cjs');
  compileCache();
  // No network: in a partial clone, Git never fetches an object the project lacks, in any of the server's Git calls.
  process.env.GIT_NO_LAZY_FETCH = '1';
  // The canonical server spawns workers from argv[1]; point it at its bundled CLI. `--plugin`: its host was given the
  // turn hooks, so a Codex session that never runs them is told once (runtime/drift-mcp.ts).
  process.argv = [process.execPath, cli, 'mcp', project, '--stdio', '--profile', binding.profile, '--plugin'];
  require(cli);
}

var version = process.versions.node.split('.').map(Number);
if (!(version[0] > 22 || (version[0] === 22 && version[1] >= 9))) serveOff('Fragments is off: it needs Node 22.9 or later, and found ' + process.versions.node + ' at ' + process.execPath + '.');
else {
  try { main(); }
  catch (error) {
    process.stderr.write('Fragments plugin: ' + error.message + '\n');
    process.exitCode = 2;
  }
}
