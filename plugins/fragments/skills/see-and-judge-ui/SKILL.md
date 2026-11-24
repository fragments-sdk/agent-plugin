---
name: see-and-judge-ui
description: See a React app's real pages as pictures before changing its UI, and judge the change against the ask, the design contract and a detail audit before calling it done. Use for any visible UI change, layout, styling, copy on screen, a new state or a fix someone can see.
---

A visible UI change starts with `see` and is not done until `judge` holds.

## 1. Before editing: `see`

- Call `see` with the person's `ask` and affected `pages` (paths like `/settings`; omit `pages` to capture pages reached by your change).
- For states behind interaction, pass `states` (page + control names from the structure file). Pass `widths` (`390` phone, `1440` desktop) when checking fit.
- Open every returned PNG and read its structure file (headings, controls by name and box, visible text). The run's first picture of each page stays as the before baseline. Pass `new: true` to start a fresh run for a new task.

## 2. Edit on the project's system

- Read tokens and components with `design_system` (pass `query` for targeted components/tokens or `file` for local spelling), then edit with your usual tools within the person's request.

## 3. Before handing back: `judge`

- Call `judge` (pass `ask` if `see` did not include it). It recaptures the pages and checks:
  - the ask (via the Fragments app judge when open);
  - Drift added since `since` (default: uncommitted changes);
  - the detail audit (type scale, 4 px spacing grid, AA contrast, 24 px targets, even gaps, shared edges, centered text, nothing clipped without a way to read it).
- Every row returns `held`, `to look at`, `missed`, or `not judged` with location and reason. Fix misses, inspect flags, and re-run `judge`.
- Report verdicts honestly: a `not judged` or unverified row is never a pass, and a partially judged run is not done.

## Without the Fragments app open

Start the project's dev server and pass its local address as `url` (e.g. `http://localhost:5173`) to `see` and `judge`. The plugin captures pages in headless Chromium with secrets masked and judges Drift and the detail audit; the ask, interactive states, and signed-in pages are reported as not judged. Report those limits verbatim. Never substitute a raw browser screenshot for a missing picture, and never guess past a sign-in wall, failed step, or redirect.

If `see` and `judge` are not in this session, say so plainly in one line. They load in local MCP hosts (Claude Code, Codex, Cursor, Antigravity); with the Fragments app open (`usefragments.com/download`), they judge everything including the ask. Do not picture pages another way or call a change judged without them.
