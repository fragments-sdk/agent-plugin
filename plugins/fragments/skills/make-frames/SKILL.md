---
name: make-frames
description: Mock a screen or state in seconds before building it - frames rendered on the project's own components and tokens, pictured, measured and judged, kept outside the project. Use to explore a layout, lay out every state of a component, compare directions, or start a change from the page as it is today.
---

Frames are quick, real mocks: JSX on the project's own components (or plain HTML), rendered in a headless browser,
pictured, measured and judged in about a second. Nothing is written into the project, and there is no cap.

## One round

1. **Open.** If `frames_start` is available, call it once with the ask and project. It creates an empty set and opens its canvas; use the returned set for every draw. The canvas shows each frame as it lands. Do not open another canvas for the same round.
2. **Draw live.** For new frames, use `frame_stream`: `begin` with set, name and kind (`jsx` or `html`), then `append` source in meaningful chunks with sequence numbers 1, 2, …, then `finish`. Each append is genuinely new source, one visible part at a time: the canvas draws every line and box a chunk adds under your cursor, so a small chunk reads as a hand at work and a whole page in one chunk does not. Put `data-name` on each part; the cursor says what it is drawing by that name. If finish is uncertain, inspect the set with `frames` before writing again; never retry finish. For copies, edits, or when this tool is unavailable, use `frame`.

   For a page that exists, `frame_from_page` first, so before and after are measured alike; else `frame`:

   ```json
   { "project": "/abs/repo", "set": "settings-calmer", "ask": "Settings, calmer",
     "frames": [
       { "name": "Settings", "jsx": "<Card data-name=\"card\">…</Card>" },
       { "name": "Empty", "state": "empty", "from": "f1", "edits": [{ "find": "items={rows}", "replace": "items={[]}" }] }
     ] }
   ```

3. **Read each verdict.** **held** passes; **look** wants your eye (`frame_see` with `judge`); **missed** broke a
   rule (fix its rows); **unverified** could not be read (draw it again). Draw again until none is missed.
4. **Pick.** Once none is missed, ask the person to pick on the open canvas. If `frames_start` was unavailable, or a frame answer says no canvas is reading the set, call `frames_show` with the set once. An unverified frame can be drawn again; the canvas updates and marks it Not checked until then. A canvas that cannot keep up says when it was drawn: say so and ask by the frame names.
5. **Wait.** A pick comes back as their message: "I picked f2 “Empty” in set …". Some hosts only put those words in the message box, and the canvas tells the person to press Send; until then you have heard nothing. If `frames` does not show that pick, `frames_pick` records it, and the canvas then says you have it.
6. **Use.** `frame_use` with the `set` builds it; call again with `run` for the receipt.

The same plugin has three more tools the round can lean on: `design_system({ project, query })` lists the project's
components and their props; `see({ project, pages: ["/settings"] })` pictures a real page;
`use_undo({ project, run })` takes a `frame_use` run back.

## Writing frames

- **`project`** is the absolute repository root. A refusal names the folder it would not take (Home, a volume root,
  the plugin's own) and the one to pass.
- **Source** is plain JSX, a component body that ends in `return (…)`, or a module with `export default`. The
  project's components are in scope by name, the library's and the app's own, as `design_system` lists them: draw
  the app's chrome with them, never with plain tags. A frame is a picture, so hooks are not in scope: give a control
  its value and `onChange={() => {}}`. A component that needs the running app is refused by name; draw that part on
  the tokens.
- **Size.** A frame is 1440 × 900 unless `size` says otherwise. A one-root section with its own background fills the frame; a
  bar, a centred column and a small part keep their size. For a part on its own, pass the `size` it has.
- **Names.** A frame is named by what tells it apart, first and short ("Empty", never "Settings 02 · Empty"). Put
  `data-name` on every part you will talk about: boxes, regions and fixes are found by it.
- **States.** One call takes up to 12 frames. A copy (`from` + `edits`) with its own `state` is a sibling state; one
  without is a new version. `can` on the first frame says which states apply (`[]` for one); `frame_states` lists
  what is drawn and what is not, and `widths: true` judges a frame at the project's own widths.
- **Look closely before calling it right:** `frame_see` with `region: { name: "card", pad: 16 }` at `scale: 2`.
  Place overlays from its boxes, never by eye; read the rows, never the picture alone.
- **Small changes:** `frames` with `id` and `parts` gives offsets and the `rev`; `frame_edit` applies them or takes
  the last step back. `frame_remove` takes a frame or the set away.
- **Walk it:** `to="Paid"` on a control makes a ⌘-press on it go to the frame named Paid.

## Pages that need the app

**What `frame_from_page` captures.** Pass url for a served page (the app’s dev server, any http address), or
screen for the Fragments app itself while it is open: stage is the project’s page as Fragments shows it, at its
width; home, chat and canvas are the screen Fragments’ window shows now (an agent never moves the window). A page
still loading comes back missed, with the row "The page was still loading: …". When no DOM can be read the answer
says "Picture only; no frame" and why; a picture is never passed off as a frame.

A page that boots only in its shell or behind a sign-in misses from a served URL: capture it with `screen: "stage"`,
and if that is a picture only, mock it with the app's components beside a `see` picture, and say so. Never drive the Fragments app to make or see frames: these tools draw
in their own browser. `frame_use` needs the app open and drives it itself. A pick in Fragments or on the canvas is the
set's one pick; `frames` with `set` reads it.

## Limits

Up to 12 frames a call; no cap on calls or frames in a set. A removed frame is kept 7 days, and its id is never
reused. Sets live outside the project, in ~/.fragments/frames/.

## When it goes wrong

Every error says what to do: no browser (install Chrome or Edge); no such set or id (call `frames`); an edit that
matched nothing (copy the exact text from `frames` with `source`); a frame another writer changed first (read it
again, then write your change on it). `frame_use` with faults left: fix each row in the project's files, look again
with `see`, or `use_undo`. Never call it done from the first answer.
