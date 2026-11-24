---
name: take-ui-directions
description: Try 2 to 3 directions of a UI change in the running Fragments app before choosing one, each built as real code in its own copy of the app and pictured, then use the one the person picks as one change with Undo. Use when a UI change has more than one good answer.
---

Use `take` when a UI change has more than one strong direction (layout, flow, hierarchy, control). Start with 2 to 3 directions, never one. For changes with one clear answer (typos, contract colour fixes, bugs), edit directly.

Draw directions as frames first (`make-frames`: `frame_from_page` for Today, then `frame_stream` per direction). Frames first; take is only for what a frame cannot show: data loaded or saved, a submit, routing or a flow across pages, a sign-in or live data, or a page frame_from_page answers "Picture only; no frame". Say why in one line when you take.

## Define distinct axes

- Name each direction by the one axis it differs on in 2 to 4 plain words (`"One clear choice"`, `"Dense table"`, `"Steps in a row"`). Two directions on the same axis are one direction; pull axes apart.
- In `words`, specify what changes on that axis and what stays fixed. Pass the person's words in `ask` and set `page` when scoped to one page.

## Run, wait, inspect, apply

1. `take` returns the `run` name, direction letters (`A`, `B`, `C`), finish time, and `checkAgainSeconds`. Nothing in the project changes yet. Always pass `run` to `take_state` and `use`.
2. Wait `checkAgainSeconds` before calling `take_state`, and between reads (never poll in a tight loop). `take_state` returns each direction's state, verdict, and PNG path beside Today.
3. Never call `use` before judging from pictures. Open each ready PNG whole with your image reader and compare against Today and the ask. Summarize each direction in one line, recommend one with rationale, and let the person choose when present.
4. Apply the chosen letter with `use { run, direction }` (lands as one change with Undo); `use_undo { run }` reverts cleanly if needed.
5. Each take is one bounded round. If no direction fits, explain why in one line and start a sharper take rather than hand-editing a direction.

## Requirements and limits

`take` and `use` require the Fragments app open on this computer. If it is closed or the project is not open there, relay the refusal and stop (offer to open Fragments or edit directly). Never open, start, or drive the app yourself, and never build directions yourself in place of the app.

If `take` and `use` are not in this session, say so plainly in one line. They load in local MCP hosts (Claude Code, Codex, Cursor, Antigravity) and require the Fragments app open on the project (`usefragments.com/download`).
