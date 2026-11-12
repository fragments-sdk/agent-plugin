---
name: make-frames
description: Mock a screen or state in seconds before building it - frames rendered on the project's own components and tokens, pictured, measured and judged, kept outside the project. Use to explore a layout, lay out every state of a component, compare directions, or start a change from the page as it is today.
---

Frames are quick, real mocks: JSX on the project's own components (or plain HTML), rendered in a headless browser,
pictured, measured and judged in seconds. Nothing is written into the project. Each tool's own description
has its parameters and answers; this skill has the order and the rules between the tools.

## The round

1. frames_start { ask, project }, where the host has it: one canvas for the round; pass its set to every draw.
2. design_system { project }: the components, icons and tokens a frame may name.
3. Draw: when the page or part exists, frame_from_page first; then each new frame with frame_stream, one per direction.
4. Fix each frame in place with frame_edit, as its `Next:` line says, until none is missed.
5. Ask the person which to build, by the frames’ names.
6. When their message names a pick or asks to build one: frame_use { set }.

Each answer's `Next:` names the call to make. Paste no rows or pictures to the person unless they ask.
Before calling a screen done, use frame_states { set, id }; ask for a pick by frame name, with any open look row, "not checked" or kept off-scale value beside it. If the canvas cannot keep up, ask by name.
A look or unverified frame gets two tries, then go on. A pick on the canvas lands in the person's message box: you hear it when they press Send. A pick said in chat that frame_list does not show: frames_pick { set, id }, then frame_use { set }.

## If you are a subagent

The person never sees a canvas you open. Their chat calls `frames_start` and passes the set in your brief; draw into
it. Never call `frames_show`: if you started your own set, put the `frames_show` call your `frames_start` answer ends
with first in your report, and the parent chat makes it before it says anything about the frames.

## Draw

- **Start from the real thing.** When the page or part exists, `frame_from_page` makes its base. A small change copies it with frame (from + edits), so the rest stays the real thing; a new direction is drawn beside it with frame_stream, never copied from it.
- **Directions** (two to four ways to answer one ask): capture Today, then draw each as step 3 says. For a page the app
  does not have yet, pass `route` (and `fresh: true`) where the set starts: Use builds it there.
- `take` only for what a frame cannot show (see `take`).
- **Draw only what was asked.** When it is unclear whether "the top bar" means the bar alone or the screen with it,
  draw the bar alone and a second frame named "In place".
- **A frame is a picture:** hooks are not in scope, so give a control its value and `onChange={() => {}}`. A
  component that needs the running app is refused by name; draw that part on the tokens.
- **Walk it:** `to="Paid"` on a control in the JSX is the person's walk: Cmd- or Ctrl-click goes to the frame named
  Paid. A play step `{ "to": "Paid" }` walks there by itself.
- **Read the rows, never the picture alone.** Place overlays from `frame_see` boxes, never by eye.

## A page that needs the app

A page that boots only in its shell or behind a sign-in misses from a served URL: capture its part from `jsx`, every
prop a plain value (`frame_list` with `choices` lists them; the app's own call site is the model), wrapped in the
provider it reads. The base is the part's real markup as HTML: change it with `find`/`replace` or part edits.
Failing that, `screen: "stage"`; if that is a picture only, mock it with the project's components beside a `see`
picture, and say so. Never operate the Fragments desktop app yourself: `frame_use` does that, needing only that it is
open.

## What the judge checks

Values on the project's scale, contrast, names and keyboard; and the design as a team would review it, each a row at
a part's box with its fix: one primary action per region; fields and words legible (no enabled field that reads as
disabled, no words under 10 px); controls on one line; parts inside their column; labels in words ("± 5" says
nothing); real, whole content (stand-in words miss; grey blocks, a control cut off or words spilling ask a look). A
skeleton on purpose is a frame whose state is "loading".

## Limits and errors

Sets live outside the project, in ~/.fragments/frames/. Every error names its fix; no browser at all means install Chrome or Edge.

If `frame` and the other frame tools are not in this session, say so plainly in one line and stop. They load in Claude Code, Codex, and Cowork on the person’s computer; a chat that ignores local servers and hooks, such as Claude’s web chat, has none of them. Do not draw mocks another way and call them frames.
