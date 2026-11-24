---
name: make-frames
description: Mock a screen or state in seconds before building it - frames rendered on the project's own components and tokens, pictured, measured and judged, kept outside the project. Use to explore a layout, lay out every state of a component, compare directions, or start a change from the page as it is today.
---

Frames are quick, real mocks: JSX on the project's own components (or plain HTML), rendered in a headless browser, pictured, measured, and judged in seconds. Nothing is written into the project. Each tool's schema holds its parameters; this skill holds the order and rules between them.

## The round

1. `frames_start { ask, project }`, where the host has it: one canvas for the round; pass its `set` to every draw.
2. `design_system { project }` (unqueried calls return a compact summary; pass `query` for specific components, token kinds, or icons): the components, icons, and tokens a frame may name.
3. Draw: when the page or part exists, `frame_from_page` first; then each new frame with `frame_stream`, one per direction. Pass `pictures: "medium"` on `frame`, `frame_edit`, and `frame_from_page` (never `frame_stream`) on desktop frames for readable 720 px previews.
4. Fix each frame in place with `frame_edit` (pass `all: true` on a find/replace edit to replace every match in one call, and `frame_see { set, id, judge: true, all: true }` to read all verdict rows at once), as its `Next:` line says, until none is missed.
5. Ask the person which to build, by the frames' names.
6. When their message names a pick or asks to build one: `frame_use { set }`.

Each answer's `Next:` names the call to make. To the person, relay only its "Tell the person" lines; rows and pictures only when they ask.

- Before calling a screen done: `frame_states { set, id }`.
- Ask for a pick by frame name, with any open `look` row or `"not checked"` beside it. Never present an `unverified` frame as passed.
- A `look` or `unverified` frame gets two tries, then go on and label it `"not checked"`. Never redraw while `checking` is still running.
- If the canvas cannot keep up, ask by name.
- A pick on the canvas lands in the person's message box: you hear it when they press Send.
- A pick said in chat that `frame_list` does not show: `frames_pick { set, id }`, then `frame_use { set }`.
- Once frames are judged, when the host has no canvas or the person wants one offline file to keep or send: `frame_page { set }`, then report the saved file path. It opens nothing and sends nothing.
- No project yet: call `design_system` and `frame` without `project`. They draw on Fragments' starter kit (kept under `~/.fragments/starter`). Tell the person it is a starter, not their design system. `frame_use` needs their own project; `frame_export` hands a frame on as it is.
- Whole long pages (landing pages): pass width and full height up to 16000. Past 1600 tall (1500 at phone width), `vh` measures one screen (900 px; 844 px on phone), so a `100vh` hero stays one screen. Inspect a screen at a time with `frame_see` and `region`; `{ "scroll": "prices" }` in `play` pictures that scrolled position (a picture, not a verdict).
- External reference to draw beside: `frame_from_page { url, reference: true }`. Captured whole and kept in the set, never judged, picked, used, shared, or exported. Draw your own beside it; never copy it whole.
- A Figma file to draw beside: `frame_from_figma { fig }` with the whole path of the `.fig` the person saved (Figma: File → Save local copy…); `list: true` names its pages and frames first. A file outside the project is read once the person says yes in their host's dialog. Each frame lands as a reference, drawn as Figma has it, read on this computer. To build from one, read it with `frame_see`, then draw it on the project's components with `frame_stream`; the reference stays beside it to compare.
- Export to another design tool: `frame_export { set, id }` writes flex-only inline HTML and a PNG beside the frame and returns both paths. Hand the HTML on yourself; it is the frame as drawn, not production code.

## If you are a subagent

The person never sees a canvas you open. Their chat calls `frames_start` and passes `set` in your brief; draw into it. Never call `frames_show`: if you started your own set, put the `frames_show` call your `frames_start` answer ends with first in your report so the parent chat opens it first.

## Draw

- **Start from the real thing.** When the page or part exists, `frame_from_page` makes its base. A small change copies it with frame (from + edits), so the rest stays the real thing; a new direction is drawn beside it with frame_stream, never copied from it.
- **Directions** (2 to 4 ways to answer one ask): capture Today, then draw each as step 3 says. For a new page, pass `route` and `fresh: true` where the set starts so `frame_use` builds it there.
- `take` only for what a frame cannot show (see `take`).
- **Draw only what was asked.** If it is unclear whether "the top bar" means the bar alone or the screen with it, draw the bar alone and a second frame named "In place".
- **Name parts in the person's words:** `data-name` appears on the canvas, so `"button"`, never `"cta"`.
- **A frame is a picture:** hooks are not in scope, so give controls a value and `onChange={() => {}}`. A component needing the running app is refused by name; draw that part on the tokens.
- **Walk it:** `to="Paid"` on a control lets Cmd- or Ctrl-click jump to the frame named Paid; `{ "to": "Paid" }` in `play` walks there automatically.
- **Read the rows, never the picture alone.** Place overlays from `frame_see` boxes, never by eye.

## A page that needs the app

A page that boots only in its shell or behind sign-in misses from a served URL: capture its part from `jsx` with plain prop values (`frame_list { choices }` lists them; match the app's call site) wrapped in the provider it reads. Edit the captured HTML with `find`/`replace` (`all: true` when repeating) or part edits. Failing that, capture `screen: "stage"`; if that returns picture-only, mock with the project's components beside a `see` picture and say so. Never drive the Fragments desktop app yourself: `frame_use` handles it when open.

## What the judge checks

Values on the project's scale, contrast, accessible names, and keyboard support; plus design review rows at each part's box with fixes: one primary action per region, legible fields and text (no enabled field reading disabled, no text under 10 px), controls on one line, even gaps and shared edges, parts inside their column, plain-word labels, and real content (a skeleton belongs in a frame with `state: "loading"`).

## Limits and errors

Sets live outside the project in `~/.fragments/frames/`. Every error names its fix; no browser found means install Chrome, Edge, Brave, or Chromium.

If `frame` and the other frame tools are not in this session, say so plainly in one line and stop. They load in local MCP hosts (Claude Code, Codex, Cursor, Antigravity); chats without local servers have none of them. Do not draw mocks another way and call them frames.
