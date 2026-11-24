---
name: hill-climb
description: Climb a frame (or a built page) to a set score, 9 out of 10 by default, with a fresh reviewer who scores it beside named references, ranks the fixes and sketches them, round after round, each round a new frame. Use when the person asks to "hill climb", "get this to a 9", "push this further", "make it a 10", or keeps saying a design is not there yet.
---

A climb is rounds of score, fix, and rescore held by a fresh reviewer who did not draw the work. Run it on frames (`make-frames`) so every round stays beside the last on the canvas and nothing lands in the project until the person picks. The score is always the reviewer's, never your own.

## Before round 1

1. Picture where it lives: `frame_from_page` for the current page and surrounding surface (shell, neighboring layout). Pass `pictures: "medium"` on desktop frames so previews read clearly.
2. Write the bar in one short list: the person's words, taste rules (surfaces, sizes, corners, motion), and any project principles (`design_system { query: "principles" }`). Use targeted `design_system { query }` calls to pull exact tokens and components. The person's word wins over every reference.
3. Name 3 to 5 best-in-class references for this kind of screen (preferring any the person named).

## The reviewer

Start one fresh subagent (never a fork: it must not inherit your rationale). Give it:

- the frame's `.png` and `.see.png` from `frame_see`, the surrounding surface pictures, and the frame source;
- the bar and named references;
- required output: a score out of 10 with one line for why it is not higher; ranked fixes by expected point gain; a concrete sketch for each fix (JSX, CSS, or ASCII box layout, never prose alone); and anything to cut.

Instruct it to score skeptically as the person would. Keep that same reviewer across all rounds (via follow-up messages) so scores stay on one scale. If a score rises without a visible picture change, ask which fix earned the points.

## Each round

1. Apply the highest-leverage fixes to a new copy (`frame { from }` with edits, or `frame_stream` for a redraw). Name each round (`"Sign in · round 3"`) so the person can step back.
2. Clear the frame's own judge rows before sending to the reviewer: read all rows in one call with `frame_see { set, id, judge: true, all: true }` and fix in place with `frame_edit` (use `all: true` on find/replace edits for repeated patterns). Judge rows are the floor, not the score. Never pass an `unverified` frame as clean; after two retries, mark it `"not checked"` honestly.
3. Send the reviewer the new pictures and change list for rescoring.
4. Stop when the target score is met, after 5 rounds, or when two consecutive rounds gain under 0.5 points: state in one line what holds it below target and ask the person.

When a fix requires a missing token, component, or asset, flag it beside the frame rather than inventing a one-off value.

## Content and motion

- **Real content only:** use the project's real names, copy, assets, and demo data; never grey blocks or placeholder text.
- **Motion:** climb the finished still first, then climb motion as its own frame using the project's duration/easing tokens and a `prefers-reduced-motion` still state. Render paused keyframes at fixed intervals (e.g. every 0.5 s) into one contact sheet and have the reviewer score ordering and payoff hold.

## Finishing

Ask the person which round to build by name, sharing the reviewer's final score, one-line gap to 10, reviewer model, and round count. Offer `frame_page { set }` if they want an offline review file, or run `frame_use { set }` on their pick.
