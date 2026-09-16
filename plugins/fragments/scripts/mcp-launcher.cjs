#!/usr/bin/env node
"use strict";

// Keep this file self-contained: packaging embeds its source in `node -e` so
// neither host needs to substitute a plugin installation path.
const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

function present(file) {
  try {
    fs.lstatSync(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") return false;
    throw error;
  }
}

function isConfigured(directory) {
  return [
    ".fragments/sync.json",
    ".fragments/manifest.json",
    "fragments.manifest.json",
    ...["ts", "js", "mjs", "cjs", "mts", "cts", "json"].map((ext) => `fragments.config.${ext}`),
  ].some((file) => present(path.join(directory, file)));
}

function projectPaths(cwd) {
  const ancestors = [];
  let current = path.resolve(cwd);
  let gitRoot;
  while (true) {
    ancestors.push(current);
    if (present(path.join(current, ".git"))) {
      gitRoot = current;
      break;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  const root = gitRoot
    ? ancestors.find(isConfigured) ?? gitRoot
    : ancestors.find((directory) => isConfigured(directory) || present(path.join(directory, "package.json"))) ?? ancestors[0];
  // Without Git, do not borrow a CLI above the selected project.
  const boundary = gitRoot ?? root;
  return { root, boundary, searchDirectories: ancestors.slice(0, ancestors.indexOf(boundary) + 1) };
}

function inspectCli(directory) {
  const manifestPath = path.join(directory, "package.json");
  if (!present(directory)) return undefined;
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch {
    throw new Error(`Cannot read the Fragments CLI package at ${directory}. Restore this project's dependencies and retry.`);
  }
  if (manifest.name !== "@usefragments/cli") {
    throw new Error(`Expected @usefragments/cli at ${directory}, found ${JSON.stringify(manifest.name)}. Check this project's dependency installation.`);
  }
  const version = typeof manifest.version === "string"
    ? /^(\d+)\.(\d+)\.(\d+)(?:\+[0-9A-Za-z.-]+)?$/.exec(manifest.version)
    : null;
  if (!version || Number(version[1]) < 3 || (Number(version[1]) === 3 && Number(version[2]) < 2)) {
    throw new Error(`Fragments plugin requires @usefragments/cli 3.2.0 or newer; found ${JSON.stringify(manifest.version)} at ${directory}. Update this project's dependency and reinstall it.`);
  }
  const entry = path.join(directory, "dist", "bin.js");
  if (!present(entry) || !fs.statSync(entry).isFile()) {
    throw new Error(`Fragments CLI is not built: ${entry}. In the Fragments repository run pnpm turbo run build --filter=@usefragments/cli; otherwise restore the project's installed @usefragments/cli package.`);
  }
  return entry;
}

function isFragmentsWorkspace(directory) {
  try {
    const root = JSON.parse(fs.readFileSync(path.join(directory, "package.json"), "utf8"));
    const cli = JSON.parse(fs.readFileSync(path.join(directory, "packages", "cli", "package.json"), "utf8"));
    return root.name === "fragments" && root.private === true && cli.name === "@usefragments/cli";
  } catch {
    return false;
  }
}

function resolveLaunch(cwd = process.cwd()) {
  const { root, boundary, searchDirectories } = projectPaths(cwd);
  const checkoutCli = path.join(boundary, "packages", "cli");
  let entry;
  // This repository can also have a published CLI installed in node_modules.
  // Its current source build must win, including an actionable unbuilt error.
  if (isFragmentsWorkspace(boundary)) entry = inspectCli(checkoutCli);
  if (!entry) {
    for (const directory of searchDirectories) {
      entry = inspectCli(path.join(directory, "node_modules", "@usefragments", "cli"));
      if (entry) break;
    }
  }
  if (!entry) {
    // The checkout fallback is only valid for the actual Fragments CLI package.
    if (present(path.join(checkoutCli, "package.json"))) entry = inspectCli(checkoutCli);
  }
  if (!entry) {
    throw new Error(`No project-local @usefragments/cli found within ${boundary}. Add @usefragments/cli to this project's dependencies and install them, or build packages/cli in the Fragments checkout. No package download or hosted MCP fallback was attempted.`);
  }
  return { root, entry, args: [entry, "mcp", "--stdio", "--dir", root] };
}

function main() {
  let launch;
  try {
    launch = resolveLaunch();
  } catch (error) {
    process.stderr.write(`Fragments MCP: ${error.message}\n`);
    process.exitCode = 1;
    return;
  }
  const child = spawn(process.execPath, launch.args, { cwd: launch.root, stdio: "inherit" });
  const forwardInt = () => child.kill("SIGINT");
  const forwardTerm = () => child.kill("SIGTERM");
  process.on("SIGINT", forwardInt);
  process.on("SIGTERM", forwardTerm);
  child.on("error", (error) => {
    process.stderr.write(`Fragments MCP could not start: ${error.message}\n`);
    process.exitCode = 1;
  });
  child.on("close", (code, signal) => {
    process.removeListener("SIGINT", forwardInt);
    process.removeListener("SIGTERM", forwardTerm);
    process.exitCode = code ?? (signal === "SIGINT" ? 130 : signal === "SIGTERM" ? 143 : 1);
  });
}

module.exports = { projectPaths, resolveLaunch, main };
if (require.main === module || process.argv[1] === undefined) main();
