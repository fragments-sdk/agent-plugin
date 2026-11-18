---
name: see-and-judge-ui
description: See a React app's real pages as pictures before changing its UI, and judge the change against the ask, the design contract and a detail audit before calling it done. Use for any visible UI change, layout, styling, copy on screen, a new state or a fix someone can see.
---

A UI change starts with `see` and is not done until `judge` holds.

**Before the edit, see.** Call `see` with the person's ask (`ask`) and the pages it touches (`pages`, app paths such as `/settings`). Name no pages to get the pages your change reaches. For a state behind a click, pass `states`: the page and the names of what to click, in order, taken from a structure file. Use `widths` (390 a phone, 1440 desktop) when the change is about fitting. Open every picture it names and read its structure file: the headings, the controls by name and box, the words. The first picture of each page in a run stays as its before.

**Edit** with your usual tools, within the person's request and the project's components and tokens (`design_system`).

**Judge before you hand back.** Call `judge` (pass `ask` if `see` did not have it). It pictures the same pages again, then holds the change to:

- the ask, judged against the pictures by Fragments' judge;
- Drift: only what this change added since `since` (default: the uncommitted change) counts;
- the detail audit: one type scale, a 4 px spacing grid, AA contrast, 24 px targets, even gaps, shared edges, words on one centre line, and nothing cut short without a way to read it.

Each row says held, to look at, missed or not judged, with where and why. Fix what missed, look at what it flags, and judge again. Done means every row holds. Report the verdict as it is: a row that was not judged is not a pass, and a run that was not judged in full is not done.

`see` and `judge` keep a task's pictures and verdict together in one run, outside the project. Pass `new: true` to `see` to start a new run for a new task.

**With no Fragments app open.** Start the project's dev server yourself and pass its address as `url` (such as `http://localhost:5173`) to `see` and `judge`: the plugin pictures those pages with its own browser, secrets masked (the answer says which; every other value shows). Then Drift and the detail audit are judged; the ask, states behind clicks and signed-in pages are not, and the answer says so: report those lines as they are.
Never stand in a browser screenshot for a missing picture. A sign-in wall, a step that matched nothing or a page that landed elsewhere is said beside its picture: say it, don't guess past it.

If `see` and `judge` are not in this session, say so plainly in one line. They load in Claude Code, Codex, and Cowork on the person’s computer; a chat that ignores local servers and hooks, such as Claude’s web chat, has none of them. With the Fragments app open on the project (usefragments.com/download) they judge everything, the ask included. Do not picture pages another way or call a change judged without them.
