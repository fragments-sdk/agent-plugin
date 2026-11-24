# Fragments plugin reference

Everything the [README](README.md) leaves out: requirements, multi-host setup, each tool, the contract panel, what the plugin runs and keeps, updating, uninstalling, limits, and fixes.

## Requirements

- **Node 22.9 or newer.** Run `node --version`. macOS does not come with Node: get it from nodejs.org, or `brew install node`.
- **Host:** Claude Code, Codex, Cursor, Antigravity, or any stdio MCP host.
- **For frames and headless browser tools:** Chrome, Edge, Brave, or Chromium. Windows always has Edge.
- **Your project:** reads CSS, SCSS (including Modules), and class names in React projects. Tested on macOS and Windows.

## Install notes

The install commands are in the [README](README.md#install).

### Claude Code: the plugin directory copies

**Install it once.** If you turned Fragments on in Claude's plugin directory, Claude Code already has it as `fragments@synced`: do not install it here too. Keep one or the other, so only one Fragments answers.

The folders under `stores/` are the copies the plugin directories read, made by the same build: `stores/claude/fragments` for Claude's (without the carried bundler), and `stores/openai/fragments` for OpenAI's, a skills-only copy that checks when asked, with no hooks or server. Install from this marketplace with the commands in the README.

### Codex: trusting the hooks

The next time you open Codex after installing, it asks you to review the Fragments hooks: choose **Trust all and continue**. If you skip it, Codex runs without them and asks again next time; to trust them later, type `/hooks` and press `t`.

- If the current connection has not heard from the hooks, Fragments reports that uncertainty once, so your agent can check its edits manually.
- A hook heard in an earlier connection does not suppress this notice.
- An update that changes the hooks needs trusting again.
- Silence alone does not establish that an edit was checked.

### Cursor, Antigravity, and other stdio MCP hosts

Clone `fragments-sdk/agent-plugin` once and configure the stdio MCP command:

```bash
node /path/to/agent-plugin/plugins/fragments/engine/dist/cli.cjs mcp --session --stdio --profile read --plugin
```

That exposes every Fragments MCP tool without Claude Code or Codex turn hooks, so ask your agent to run `check` on edited files. To also run SHA-256 verification and wire carried esbuild, Sass, starter, and share-viewer assets (for projects without their own bundler), launch:

```bash
node /path/to/agent-plugin/plugins/fragments/assets/launch.cjs --receipt-sha256 <sha256-from-mcp/codex.json>
```

### One-shot CLI check

Run the bundled project checker directly with nothing installed in your project:

```bash
npx -y github:fragments-sdk/agent-plugin .
```

Accepts `[app] [--json | --where] [--since <base>] [--files path...]`.

## Setup and your contract

Installing the plugin does not initialize a design system or choose Fragments UI. Detected components belong to your project's own inventory and are reuse suggestions. Saved rules remain visible, but plugin turns are held only when `fragments.config.json` explicitly sets `contract.mode` to `"strict"`. A missing mode is advisory for plugin hooks; the standalone check and CI keep their existing verdict semantics.

Contract setup is optional. The agent starts it only when you ask; a missing contract is not a reason to prompt you to create one. You can continue building with your current library or no library.

## What each part does

### Reading the system (`design_system`, `contract`)

- **`design_system`** lists your project's tokens, building blocks, icon sets, and closed prop choices so agents draw and edit from what already exists. Unqueried calls return a compact budget (up to 30 building blocks and 20 tokens per category, prioritizing resolved tokens). Pass `query` (a component name, token kind like `spacing` or `colour`, or icon word) for filtered full results, or `file` to match that file's token spelling. Duplicate component names are disambiguated by import path.
- **`contract`** reads the project's saved policy, mode, source rules, baseline, and CI status.

### After each edit, and before it hands back (`check`, `explain`)

- **After each edit**, the agent receives source locations for advisory findings, or detailed findings with your system's value under a strict contract. A completed comparison with no new drift gets a short confirmation.
- **Before it hands back**, the plugin reports new drift. Only an explicit strict contract may hold the turn for a repair or an explanation; unconfigured and advisory projects receive suggestions.
- **`check`** and **`explain`** run the same engine on demand, accepting `files` and `since` (a Git branch, tag, or commit).

### The receipt

When a turn ends with drift fixed, kept, or still open, you see one line, such as `Fragments receipt: 3 fixed, 1 kept, 0 open`, and the file with the details.

### Changing the contract from the terminal

Ask your agent to approve a token, set the components to build with, or add the check to CI. `contract_propose` shows you what would change. `contract_save` asks you in Claude Code's or Codex's own dialog, and writes only if you tick its box and accept. Nothing is committed, and `contract_undo` undoes the last save while its files are unchanged. The dialog covers what Fragments writes; your agent's own edits are your host's to ask about.

### The check in CI

In CI, the check writes the same lines to the run's summary page on GitHub, once the project's checker is this release's. CI runs the checker pinned in your project at `.fragments/drift.cjs`, added by the Fragments app or by your agent with your yes. It is the same file either way. Commit and push the GitHub Actions check file to run it on GitHub.

How the command-line check decides:

- With no contract chosen, it fails on any counted drift.
- Advisory lists drift and passes.
- Strict fails only on new drift.
- `--since <base>` judges only what the change added.
- A run that could not read everything is incomplete, and never a pass.

### Frames: mock a screen before you build it

Ask for a layout, every state of a component, or two directions to compare. The agent draws frames (`frame_stream`, `frame`, `frame_from_page`, `frame_from_figma`, `frame_edit`, `frame_see`, `frame_list`, `frame_states`, `frame_remove`) on your project's own components and tokens in your own Chrome, Edge, Brave, or Chromium (headless). It pictures, measures, and judges each, and keeps them outside your project in `~/.fragments/frames/`. Where your host shows MCP Apps, the set opens on a canvas in the chat (`frames_start`, `frames_show`, `frames_pick`) and **Use** hands the pick to your agent. With the Fragments app open, `frame_use` turns the picked frame into real code as one change with Undo.

- **`pictures: "medium"`** returns up to 720 px wide previews, readable for desktop frames without full-size PNG weight (`small` is 320 px, `full` is full resolution, `none` is text only).
- **`frame_edit` with `all: true`** replaces every matching occurrence in one find/replace edit, without switching to byte offsets.
- **`frame_see` with `judge: true` and `all: true`** returns every verdict row in one call (up to 12 KB) instead of paging with `skip`.
- **`frame_page`** saves a set as one self-contained HTML file beside it, outside your project, to keep or send. Each frame carries its picture, name, and readable code. It opens nothing and fetches nothing.
- **No project yet:** `design_system` and the frame tools work when `project` is omitted, drawing on Fragments' starter kit (`Badge`, `Button`, `Card`, `Field`, `Heading`, `Stack`, `Text`) kept in `~/.fragments/starter`. Every answer says it is a starter, not your design system. `frame_use` needs your own project.
- **Whole long pages:** a frame can be up to 16,000 px tall. Past 1,600 px tall (1,500 px at a phone's width), `vh` is measured against one screen (900 px, or 844 px on a phone), so a full-height hero stays one screen. A play step `{ "scroll": "prices" }` pictures the screen where that part comes to rest (a picture, not a verdict).
- **References:** `frame_from_page` with `reference: true` captures a page from elsewhere to its full length and keeps it beside your frames. A reference is never judged against your system, picked, or used, and a shared set leaves it out.
- **Figma files:** `frame_from_figma` with the whole path of a `.fig` you saved (in Figma: File → Save local copy…) lands its frames as references, drawn as Figma has them and read on your computer, with nothing sent anywhere; a Figma link is not read. `list: true` names the file's pages and frames first, and a call brings up to 12. A file outside the project is read once you say yes in your host's dialog.
- **`frame_export`** writes one frame as self-contained flex-only inline HTML (no grid, margins, tables, style block, or classes) and a PNG beside the frame, outside your project, for handing off to another design tool. Nothing is sent or published.

### Try two or three directions (`take`, `take_state`, `use`, `use_undo`)

With the Fragments app open, `take` builds each direction as real code in its own copy of your app and pictures it. `use` applies the one you pick as one change with Undo (`use_undo`). Without the app, each says so in one line.

### See the real pages, and judge the change (`see`, `judge`)

With the Fragments app open on your project, `see` pictures its pages (at the widths and states you name) through the app. `judge` pictures them again after the edit and holds the change to your ask, to the drift it added, and to a detail audit: type scale, 4 px grid, contrast, target size, nothing cut short. A row that could not run says so; it is never a pass.

**With no app at all,** start your dev server and pass its address (such as `http://localhost:5173`) to `see` and `judge`. The plugin pictures those pages in its own headless browser, secrets masked, and judges Drift and the detail audit from them. Addresses on this computer only; nothing is sent anywhere. The ask, states behind a click, and signed-in pages are not judged this way, and the answer says so.

### Headless browser (`open`, `read`, `act`, `set`, `save_test`)

Open, read, and drive pages in your local headless Chrome, Edge, Brave, or Chromium with no Fragments app required. `open` returns controls with refs (`e1`, `e2`), `read` inspects the page or a ref, `act` runs click/fill/select/press/upload/drag steps and reports console errors and failed requests, `set` sets viewport, theme, reduced motion, locale, timezone, clock, geolocation, or network throttling, and `save_test` writes the run as a Playwright test in your project. Passwords typed on localhost are masked in tool results.

### Hosted review links (`link_publish`, `link_revise`, `link_review`, `link_reply`, `link_resolve`, `link_progress`, `link_list`, `link_manage`)

With the Fragments app open, your agent can share a page, git diff, frame set, prototype direction, or structured update as a hosted review link (`link_publish`) that reviewers open in any browser with nothing installed. `link_review` reads reviewer comments, votes, answers, and pinned element crops back into your agent. `link_revise` pushes V2 onto the same link without spending another monthly link; it returns `not-found` if the open project does not hold that link rather than silently minting a second link, unless `newLinkIfMissing: true` is passed. `link_reply` and `link_resolve` answer and close threads, `link_progress` shows live fix status on the link, and `link_list` / `link_manage` inspect or revoke links. Free accounts get 3 new review links per calendar month; Pro has no limit. Reviewers never pay or sign in.

### Built-in Record (`record_start`, `record_stop`, `record_list`)

With the Fragments app open, `record_start` and `record_stop` record the app window while you or your agent work, keeping pictures, `times.jsonl`, `marks.json`, and `film.mp4` under `~/.fragments/recordings/` (never in your project, never sent anywhere, unmasked). `record_list` lists existing takes even without the app open. The person's pointer is drawn in the pictures and film, with a ring on each press, unless they turned it off in Fragments' Settings; `record_start` takes `pointer: true | false` to choose for one take, and its answer says which was used. The agent cursor Fragments draws while an agent works is in the pictures either way.

### Your app's pages (`page_map`)

- **List them from source.** `page_map` reads the routes from your code with no app and no server, and says what source alone cannot know.
- **Find missing page examples.** Ask your agent to use `discover-pages` to investigate dynamic routes from source and available browser evidence. Inside Fragments, its page tools can register one real example per pattern. A standalone plugin session reports verified candidates and unmet prerequisites, without registering examples or claiming screenshot coverage. Your app's source and data stay unchanged.

## Which tools need the Fragments app

- **Need the Fragments app open on your project:** `take`, `take_state`, `use`, `use_undo`, `frame_use`, `record_start`, `record_stop`, `link_publish`, `link_revise`, `link_review`, `link_reply`, `link_resolve`, `link_progress`, `link_list`, `link_manage`, and `frame_from_page` when capturing the app's own screen instead of a URL. Without the app, each says so in one line and does nothing.
- **Work both ways:** `see` and `judge` use the app when open; without it they take a local dev server `url` and judge Drift and the detail audit (not the ask). `open`, `read`, `act`, and `set` use the open app's page when available and fall back to headless Chromium otherwise.
- **Work with no app at all:** `check`, `explain`, `design_system`, `contract`, `contract_propose`, `contract_save`, `contract_undo`, `contract_review`, `page_map`, `record_list`, `save_test`, and all Frames drawing/editing/export tools (`frame`, `frame_stream`, `frame_edit`, `frame_see`, `frame_list`, `frame_states`, `frame_remove`, `frame_page`, `frame_export`, `frame_from_figma`, `frame_from_page` with `url`/`jsx`).

Get the app at [usefragments.com/download](https://usefragments.com/download).

## Review your contract

Ask your agent to review this project's contract. In a host that supports MCP Apps, `contract_review` shows components, tokens (with live colour swatches, proportional spacing bars, corner-radius boxes, and `Aa` type badges), spacing, and check settings. Select **Review changes**, inspect the proposed files in Unified or Split diff mode, then choose **Save changes** to confirm those exact changes. **Undo last save** shows the saved change; **Confirm undo** restores its files if they have not changed since. **Not now** leaves pending choices unsaved.

The panel owns contract confirmation. Your host may additionally ask permission to run its write tool, and its restrictions still apply. Panel Save does not require MCP form elicitation or a change of permission mode. A denied call is not retried through another writer. Expired or stale proposals need a fresh review; an uncertain write outcome is checked before another write is allowed. Nothing is committed.

In a terminal, your agent shows the same state and proposed changes as text. The model-facing `contract_save` and `contract_undo` still require native confirmation. If that connection cannot display it or its approval policy automatically declines it, text inspection and proposals work but those tools do not write. The panel is the portable confirmation path in graphical hosts; all terminal permission modes are not certified.

### Host support

The local Claude Code/Codex plugin installation does not also register a hosted ChatGPT connector or a Claude Desktop extension. Panel support, permission handling, and app-only tool isolation must be tested on the actual connection. A browser/protocol harness does not establish native compatibility.

**Native acceptance, 15 October 2026:** the revised panel saved and undid an advisory contract in Codex desktop 26.1007.71326 Full access and Claude Desktop 2.37337.1 (macOS). Claude's connection had no native elicitation; panel Save/Undo issued none. Cancelling Undo kept the saved files. Both completed Undo tests restored the exact starting files. This verifies those desktop configurations, not every host version or terminal mode.

## What it runs

- **Node** from your PATH (22.9 or later) runs `assets/launch.cjs`. It checks every file the plugin ships against the SHA-256 in `PLUGIN_BUILD.json`, whose own hash the MCP configuration pins, then starts the engine, `engine/dist/cli.cjs`, which loads the TypeScript compiler beside it (`engine/dist/typescript.cjs`) on first use. The engine starts copies of itself as workers. Both bundles are minified; their licences are in `LICENSE` and `THIRD_PARTY_NOTICES.txt`, and `engine/dist/BUILD.json` records how they were built.
- **Hooks:** four, on a prompt, before and after an edit or shell command, and when a turn ends. Each calls a hidden tool of the plugin's own server. They run no shell.
- **Git,** in your project, to read history and keep the copy described below. Git is told never to fetch (`GIT_NO_LAZY_FETCH=1`).
- **Your Chrome, Edge, Brave, or Chromium,** for Frames and headless browser tools: headless, with a new profile in your temp folder that is deleted when it closes, background networking off, and driven over a pipe rather than a port.
- **Your project's own esbuild and Sass** (and Tailwind, if it has one), loaded from its `node_modules`, to build the components a frame draws. A project with no esbuild or no Sass installed uses the ones the plugin carries (`assets/esbuild-wasm`, esbuild's own WebAssembly build, and `assets/sass`, Sass in one file). The copy in Claude's plugin directory carries Sass but not esbuild, because the directory takes no file of 5 MiB or more. There, a project without esbuild is told the one command that installs it, and its frames draw its components once it has.

## What it reads, writes, and sends

- **Reads** your project's source, on your machine. **The plugin sends nothing off your machine and fetches nothing:** it makes no network calls, and it never downloads code or updates; updates come through your host's plugin update. What it tells your agent joins the agent's conversation, like any tool result. Four things can reach past it, and each only when you or your agent ask for it:
  - `judge`, given an ask, has the Fragments app judge it with Claude on the account you already use there, so the ask and the words on the pictured page go to Claude, as they do in the app. `take` and `frame_use` have the app's agent build code, as it does in the app.
  - `link_publish`, `link_revise`, `link_reply`, `link_resolve`, `link_progress`, `link_list`, and `link_manage` talk to the open Fragments app, which publishes or updates links using your sign-in there.
  - `frame_from_page`, `open`, `read`, `act`, and `set` open the address they are given in the headless browser: normally your dev server on `localhost`. That page loads what it would load in your own browser.
  - A frame is drawn from your project's own stylesheets. If they load something from the web, such as a font, the browser loads it too.
- **Writes to your project only after you confirm** in the review panel or a supported native host dialog, and only the files each proposal lists: the contract's (`fragments.config.json` and files under `.fragments/`), `AGENTS.md` or `CLAUDE.md` for the components it asks agents to use, and, if you add the check to CI, `.github/workflows/fragments-drift.yml`. Nothing is committed. Saved local rules take effect immediately. Commit and push a CI check file to run it on GitHub.

## What it keeps, and for how long

It keeps its working files in one folder: in Claude Code, `~/.claude/plugins/data/fragments-fragments`; in Codex, `~/.fragments/agent-state`. In it:

- **Earlier contents of the files a turn changes,** so Fragments can tell what the turn added. Cleared when the turn ends.
- **A git copy of your project's source** (`shadow`): the files it checks, copied the first time in a turn that the agent runs a shell command that could write, so Fragments can see what the command changed. Older versions of changed files go after an hour; the copy stays until you delete the folder.
- **Run records** (`sessions`): which files each turn changed, and how long each check took. Kept 7 days.
- **A compile cache** (`compile-cache`), so the checker starts faster.
- **Receipts** (`receipts`): one Markdown file per turn that had drift, with the agent's own words on any it kept. Kept 30 days.
- **Undo records** (`changes`, `contract`): the files a contract change wrote, before and after. Deleted after 7 days, at the next save or the next turn that ends with Fragments' hooks on.

Outside that folder, and outside your project:

- **Pictures** from `see` and `judge`, in `~/.fragments/runs`: each page's first and latest picture and what the app read on it, by run. The newest 20 runs of each project are kept, and a run keeps at most 200 pages and widths.
- **Frames**, in `~/.fragments/frames/`, a folder per project: each set's sources, pictures, and verdicts, until you remove them. A frame you remove is kept 30 days, then deleted.
- **Recordings**, in `~/.fragments/recordings/`, a folder per project: pictures, `times.jsonl`, `marks.json`, and `film.mp4`, until you delete them.

**Size:** about 27 MB for a repository of 3,800 source files over a week of use. Almost all of it is the git copy.

**To delete it,** remove the working folder. Fragments makes a new one the next time it runs.

## Update

In Claude Code:

```bash
claude plugin marketplace update fragments
claude plugin update fragments@fragments
```

In Codex:

```bash
codex plugin marketplace upgrade fragments
codex plugin add fragments@fragments
```

Codex picks up a new version only when you add the plugin again; a new session is not enough.

In Cursor, Antigravity, or other MCP hosts: pull the latest `main` in your clone of `fragments-sdk/agent-plugin` and restart the MCP server.

### From the old plugin (0.9.0)

Update the same way. 1.0+ is a new plugin on a new engine, and it drops some of 0.9.0:

- **The `search`, `get`, and `tokens` tools.** The server was `fragments-workspace` and is now `fragments` in Claude Code (`fragments-drift` in Codex), with `check`, `explain`, `design_system`, and `contract`. Permission rules you wrote for the old server stop matching.
- **The legacy hosted contract and profile.** Everything runs on your machine.
- **Opening a preview, and `/fragments:create`**, with the `create` and `design-system-pass` skills. Ask your agent directly.

If you choose to migrate that project, preserve its old configuration first and review which rules you want to carry forward. Remove `@usefragments/cli` and only its hook entries (in `.claude/settings.json`, `.codex/hooks.json`, or `.cursor/hooks.json`) when you retire that engine, so two engines do not answer. Do not delete whole host settings files or another tool's hooks.

Legacy files can include `fragments.config.ts` (or `.js`), `fragments.manifest.json`, `.fragments/manifest.json`, and `.fragments/sync.json`. A `.fragments/tokens.json` with `catalogRevision` belongs to the old CLI; the current approved-token file uses `"version": 1` and a `tokens` list. Review and remove only obsolete files after preserving the policy you need. Until incompatible authority is resolved, Fragments reports incomplete coverage and leaves the configuration alone; an update does not authorize an automatic migration.

## Uninstall

In Claude Code:

```bash
claude plugin uninstall fragments@fragments
claude plugin marketplace remove fragments
```

In Codex:

```bash
codex plugin remove fragments@fragments
codex plugin marketplace remove fragments
```

Claude Code deletes the plugin's working folder when you uninstall it (add `--keep-data` to keep it). Codex does not: delete `~/.fragments/agent-state` yourself. In both, pictures, frames, and recordings stay in `~/.fragments/runs`, `~/.fragments/frames`, and `~/.fragments/recordings` until you delete them.

Turned it on in Claude's plugin directory (`fragments@synced`)? Turn it off there.

## Limits

- **Confirmation depends on the surface.** Compatible graphical panels use explicit Save changes and Confirm undo; the host must forward app-only tool calls and non-model metadata. Native model/terminal tools still need the host's confirmation dialog. Host permission denials remain in force; rendering alone grants no write access.
- **Shell writes:** a file the agent writes with a shell command, such as `cat > file`, gets no note right after the edit. Only edit tools say which files they changed.
- **Values the agent names:** if the agent's closing reply names a drifted value, for example one you asked it to keep, Fragments treats it as explained and lets the agent finish.
- **Very large files:** Fragments reads files up to 1 MB. If one of your app's stylesheets is bigger, or a file the agent changed is, Fragments does not guess: it tells you once a session that it cannot check, and why. Other big files, such as generated code or data, do not stop it.

## If something is wrong

- **"Fragments is off: it needs Node 22.9 or later":** your `node` is too old. Upgrade it, then restart the session.
- **Codex says nothing about drift:** inspect `/hooks` and trust the hooks if you want automatic checks. Until current feedback establishes coverage, ask the agent to run `check` on its edits.
- **Claude Code shows hook errors:** run `node --version` in the same terminal you start Claude Code from.
- **Started from the Dock?** The Claude and Codex apps take your PATH from your login shell. If Fragments does not start there, check that `node --version` works in a new terminal window.

## Support

[Report an issue](https://github.com/fragments-sdk/agent-plugin/issues) · hello@usefragments.com · [Website](https://usefragments.com) · [Privacy](https://usefragments.com/privacy) · [Terms](https://usefragments.com/terms) · [Changes](https://github.com/fragments-sdk/agent-plugin/blob/main/CHANGELOG.md)
