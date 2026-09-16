# Local tools and previews

Requires Node.js and project-local `@usefragments/cli` 3.2.0 or newer. The plugin
launches that runtime; it does not install dependencies, choose a design system,
or replace existing hooks. For setup/recovery, inspect the installed CLI's
`--help` and `doctor` instructions. Do not register duplicate hooks.

## Retrieve and check

1. `contract({})` reacquires selected authority. If this tool is absent, update
   the project's CLI; do not fabricate a summary.
2. `search({intent})`, then `get({name})` for selected components.
3. `tokens({})` for approved names. Read returned source files for actual values
   and component props when the projected contract omits those details.
4. After saving, `check({path})` for each affected UI file at the correct root.
   The checkout tool accepts saved files, not unsaved snippets. Preserve existing
   scan scope and report excluded files instead of calling them checked.

Use local file links for source paths that exist. Do not edit generated contract
files. When hook evidence is requested, inspect `.fragments/hook-evidence.json`
and separate current events from old entries. Never expose credentials.

## Run the real app

Prefer the application's existing development server and route. Keep development
previews loopback-only. Retain the server process through handoff, open the page,
and inspect affected interactions, keyboard behavior, and responsive layout.
An HTTP 200 alone does not show that the UI rendered.

For a component workspace with Workshop available, follow the project's existing
`.fragment.tsx` examples and Workshop configuration; arbitrary application routes
are not automatically discovered as component states. In a monorepo, place the
preview config in the package installing React/ReactDOM and resolve include/CSS
paths from there. Inspect the rendered iframe. Workshop's sandbox blocks native
form submissions; use the app server for real form/network behavior instead of
weakening the sandbox.

## Host invocation

- Codex desktop: `@fragments create me a settings page`. Use `open_in_codex` for
  the real preview when available; installed tools load in a fresh task.
- Claude Code: `/fragments:create create me a settings page`. `@` is file
  autocomplete. Desktop's Browser pane can open the dev server; preserve existing
  `.claude/launch.json` entries.
- Terminal hosts: show the actual receipt and working local URL.

The receipt is Markdown. This package does not promise an inline custom widget.
