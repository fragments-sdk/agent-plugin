# Changelog

## 1.3.0

- **Verdicts read like a design team's review:** one primary action per region, legible fields and words, controls
  on one line, real content. Each is a row at the part, with its fix.
- **Start from a component, not only a page.** `frame_from_page` takes a part's own markup when it needs the running
  app to draw.
- **Claude Code shows the plugin as Fragments.** Its server is now `fragments` there (Codex keeps `fragments-drift`);
  permission rules naming `mcp__plugin_fragments_fragments-drift__` need the new name.
- **Ready for the plugin directories.** `stores/claude/fragments` is the copy Claude's plugin directory reads, every
  file under its 5 MiB limit: it leaves out the bundler Frames carries, so in a project without esbuild a frame draws
  plain tags. `stores/openai/fragments` is a skills-only copy for OpenAI's Plugin Directory: the agent runs the checker
  when you ask, with no hooks or server. Install from this marketplace as before.
- **The engine is two files:** `engine/dist/cli.cjs` loads the TypeScript compiler from `engine/dist/typescript.cjs`
  beside it, so no file in the plugin is over 5 MiB.
- **Every tool has a title** that hosts can show. `judge`, `take`, `frame_use` and `frame_from_page` say they can reach
  past your computer.
- **The README says what the plugin runs, sends and fetches,** and which tools need the Fragments app, with its download
  link. Skills say plainly when their tools aren't in the session.

## 1.2.0

- **Frames: mock a screen before you build it.** Ask your agent for a layout, every state of a component or two
  directions to compare. Each frame is drawn on your project's own components and tokens in your own Chrome, Edge,
  Brave or Chromium (headless), pictured, measured and judged in about a second, and kept outside your project, in
  `~/.fragments/frames/`. Start from a page as it is today, or from nothing. In a host that shows MCP Apps, the set
  opens on one canvas in the chat as the agent draws it, part by part, and **Pick** chooses one. With the Fragments
  app open, `frame_use` turns the picked frame into real code as one change with Undo.
- **See the real pages, and judge the change.** With the Fragments app open on your project, `see` pictures its
  pages and `judge` pictures them again after the edit, holding the change to your ask, to the drift it added and to
  a detail audit. A row that could not run says so; it is never a pass.
- **Try two or three directions.** With the app open, `take` builds each direction as real code in its own copy of
  your app and pictures it; `use` applies the one you pick as one change with Undo.
- **Find missing page examples** with the `discover-pages` skill, from your source and available browser context.

Frames needs no app and no sign-in. `see`, `judge`, `take`, `use` and `frame_use` need the Fragments app open on this
computer; without it they say so in one line and change nothing.

## 1.1.0

- **Optional contract review.** Ask to review the contract in a compatible MCP Apps host for a view of components,
  tokens, spacing and check settings with proposed files and Undo. The panel confirms exact changes with Save
  changes and Confirm undo, without needing a native confirmation dialog. Host permissions still apply.
  Terminals retain the text workflow and native confirmation. Setup stays optional and user-initiated.

- **Project authority:** detected components are reuse suggestions, general foundations are optional, and reads
  identify the selected project and app. Installing globally does not initialize a project or select Fragments UI.
- **Advisory by default in plugin hooks:** only an explicit strict contract may hold a turn for new drift.
  Suggestions and receipts remain available without a contract. Setup starts only when the person asks.
- **Fresh folders work:** an explicit absolute project folder can be inspected before Git or package setup,
  without creating configuration. Session binding retains its root and symlink boundaries.
- **Current hook health:** an old successful Codex hook no longer hides missing-hook guidance in a new
  connection. Unknown coverage keeps manual checks available.

- **Change the contract from the terminal.** New `contract_propose`, `contract_save` and `contract_undo` tools. Your
  agent shows you the change; Fragments asks you in your host's own dialog and writes only on your yes, only the
  files each proposal lists. Nothing is
  committed, and Undo takes it back while the files are as it left them. Sessions without the required confirmation
  support leave files unchanged.
- **Add the check to CI** the same way: it writes the contract's mode in `fragments.config.json`, `.fragments/drift.cjs`
  (the same checker the Fragments app writes) and a GitHub Actions workflow, and a baseline when it is strict. The plugin now carries that checker, so it is about twice the size.
- **A receipt for each turn** that had drift, in the plugin's own folder, and one line when the turn ends at a stop:
  `Fragments receipt: N fixed, K kept, O open`. A turn that ends when you write again, or sits idle, gets its receipt
  without the line.
- **CI's summary page** shows the check's result on GitHub, once the project's checker is this release's.
- **Undo** takes back the last contract change in a project.
- **Codex:** the plugin says it can write (it changes the contract on your yes), carries the brand colour, and offers
  "Add the Fragments design check to this project's CI" as a starter prompt.

## 1.0.1

- **The README is in the plugin's folder too,** and the plugin names its docs, support, privacy and terms pages, for
  Claude's plugin directory. Nothing the plugin does has changed.
- **Install it once:** if Claude Code has Fragments from Claude's plugin directory (`fragments@synced`), don't install
  it from this marketplace as well.

## 1.0.0

- **New engine.** The plugin runs the Drift Engine, the same one as the Fragments app and your CI, on your machine. It
  needs Node 22.9 or later, and nothing installed in your project.
- **Hooks for both hosts.** After each edit the agent hears the drift it added; before it hands back, it fixes that
  drift or says why it kept it. Codex asks you to trust the four hooks the next time it starts, and runs them once you
  do. When Fragments can't check an edit, it says why once a session. A renamed or moved file keeps its old drift.
- **Four tools:** `check`, `explain`, `design_system` and `contract`, on the `fragments-drift` server.
- **Removed from 0.9.0:** the `search`, `get` and `tokens` tools and the `fragments-workspace` server; the Fragments
  Cloud contract and the hosted profile; preview opening, `/fragments:create`, and the `create` and `design-system-pass`
  skills. Remove `@usefragments/cli` and the hooks it installed in your projects.
- **License:** changed from FSL-1.1-MIT to the Fragments Local Use License. Versions 0.9.0 and earlier stay under
  FSL-1.1-MIT, as released.

## 0.9.0

First release, under FSL-1.1-MIT.
