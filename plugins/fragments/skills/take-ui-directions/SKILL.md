---
name: take-ui-directions
description: Try 2 to 3 directions of a UI change in the running Fragments app before choosing one, each built as real code in its own copy of the app and pictured, then use the one the person picks as one change with Undo. Use when a UI change has more than one good answer.
---

Use `take` when the person asks for a UI change whose direction is open: a layout, a flow, a hierarchy, a control, where reasonable people would build it differently. Start with 2 or 3 directions, never one. When the change has one obvious answer (a typo, a colour the contract fixes, a bug), edit it directly instead.

Draw directions as frames (the make-frames skill: `frame_from_page` for today, then one `frame_stream` per direction). Frames first; take is only for what a frame cannot show: data loaded or saved, a submit, routing or a flow across pages, a sign-in or live data, or a page frame_from_page answers "Picture only; no frame". Say why in one line when you take.

Name each direction by the one axis it differs on, in two to four plain words a person can choose between: "One clear choice", "Dense table", "Steps in a row". Two directions that differ on the same axis are one direction; pick axes that pull apart. In `words`, say what the person sees on that axis and what stays as it is. Pass the person's own words as `ask` where you have them, and `page` when the change is on one page.

`take` answers once the app has started the run, within about a minute: the run's name, a letter per direction (A, B, C, as the app shows them), the time the run finishes by and when to read again (`checkAgainSeconds`). Nothing in the project changes yet. The run appears in the Fragments app on the project's canvas, in its slideshow and in the run's record, the same run the person can open there. Every take is a run of its own: always pass its `run` to `take_state` and `use`. Wait the seconds it says before `take_state`, and again between reads; never call it in a tight loop. It lists each direction's state and its own verdict once made, and once the run is ready it answers with each direction's picture, small, beside a picture of the app today, plus each picture's PNG file.

Nothing is used before it is judged. Look at every ready picture (to see one whole, open its file with your image reader: Read in Claude Code, view_image in Codex) and compare each with today and with the ask: does it do what was asked, on the page that was asked, without breaking what was there? Say what each direction does in a line, name the one you would use and why, and let the person choose when they are there. Then call `use` with the run and its letter. The direction lands in the project as one change; the app's record says who used it. If it is wrong, `use_undo` takes it back, and the project is as it was before.

Each take is one round, bounded by its finish time; a direction still forming then is stopped. When none of the directions fits, say why in one line and start a new take with sharper axes rather than editing a direction by hand.

`take` and `use` need the Fragments app open on this computer. When it is not, the tools say so and do nothing: tell the person to open Fragments, or make the change directly if they prefer. When a refusal asks something of the person (open the project in Fragments, choose its app), pass that on and stop: never open, start or drive the app yourself. Never build directions yourself in place of the app.

If `take` and `use` are not in this session, say so plainly in one line. They load in Claude Code, Codex, and Cowork on the person’s computer; a chat that ignores local servers and hooks, such as Claude’s web chat, has none of them. They also need the Fragments app open on the project (usefragments.com/download).
