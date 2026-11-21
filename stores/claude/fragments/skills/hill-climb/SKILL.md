---
name: hill-climb
description: Climb a frame (or a built page) to a set score, 9 out of 10 by default, with a fresh reviewer who scores it beside named references, ranks the fixes and sketches them, round after round, each round a new frame. Use when the person asks to "hill climb", "get this to a 9", "push this further", "make it world class", or keeps saying a design is not there yet.
---

A climb is rounds of score, fix and rescore, held by a reviewer who did not draw the work. It runs on frames (the
make-frames skill) so every round stays on the canvas beside the last one, and nothing lands in the project until the
person picks. The score is the reviewer's, never your own: an agent asked to grade its own frame finds it good.

## Before the first round

1. Picture where it has to live, not only the frame: frame_from_page for the page today, and for the surface it sits
   in (the app shell, the layout around it, the page beside it it must match). A frame climbed alone climbs to the
   wrong place.
2. Write the bar in one short list: the person's own words from this conversation, every rule they have given about
   taste (surfaces, sizes, corners, motion), and the project's own bar or principles file if it has one
   (design_system { query: "principles" }). Their word wins over any reference.
3. Name 3 to 5 references the work is held against, products the person would call the best of this kind of screen.
   Use the person's if they named any.

## The reviewer

Start one fresh agent (a subagent, never a fork: it must not inherit your reasons). Give it:

- the frame's picture files (the .png and the .see.png frame_see writes), the pictures of the surface it lives in,
  and its source;
- the bar and the references;
- what to return: a score out of 10 with one line for why it is not higher; the fixes ranked by what each adds to the
  score; for each fix, a sketch (a few lines of JSX, CSS or an ASCII box drawing of the change), never words alone;
  and anything it would cut.

Tell it to score as the person would, a skeptic who has already said "not a 9" once if they have. Keep that agent for
the whole climb and send it each new round (SendMessage, or the host's way to continue an agent), so its scores stay
on one scale. A score that rises without the picture changing is noise: ask it which fix earned the points.

## A round

1. Apply the top fixes, the most points first, to a copy: frame { from } with edits, or frame_stream for a redraw.
   Each round is a new frame named for the round ("Sign in · round 3"), so the person can step back to any of them.
2. Fix what the frame's own verdict says (frame_edit) before the reviewer sees it: the judge's rows are the floor,
   not the score.
3. Send the reviewer the new pictures and the list of what changed. It rescores and ranks the next fixes.
4. Stop at the target, or after 5 rounds, or when two rounds in a row gain under half a point: then say what is
   holding it below the target, in one line, and ask the person.

When a fix needs something the project does not have (a token, a component, an image), say so beside the frame
rather than inventing a one-off value; a new token is a proposal the person approves.

## Content

A demo is only as good as what is in it. Use the project's real names, real copy and real pictures (its own assets,
its demo data); never grey blocks or lorem. When the work shows an example inside it (a product shown working on an
app), pick an example with pictures and names a person would want to look at.

## Motion

The frame camera pictures a still: play steps freeze animation, so a frame cannot show motion over time. Climb the
finished still first, then the motion as its own frame:

- one loop, on the project's easing and duration tokens, with a prefers-reduced-motion state that is the finished
  still;
- to judge it, render the frame's markup and CSS in a headless browser, pause every animation, set each one's time to
  fixed points across the loop (for example every 0.5s), and picture each point into one contact sheet;
- give the reviewer the sheet with the times, and have it score the order (nothing is checked before it exists,
  nothing covers what is being drawn) and the hold on the payoff, not only the frames.

## Finishing

Ask the person which round to build, by name, with the reviewer's last score and its one line for why it is not a 10.
Report the reviewer's model and the rounds it took. Then frame_use { set } on their pick, as make-frames says.
