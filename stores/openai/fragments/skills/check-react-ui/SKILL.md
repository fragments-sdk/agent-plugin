---
name: check-react-ui
description: Check saved React UI against the project's own design system with the local Fragments checker, including Next.js, Vite, TanStack Start and React Router projects. Use when the person asks to check UI, to see the project's components and tokens, or to find hand-made UI that the project's components already cover.
---

The Fragments checker is `scripts/cli.cjs` in this skill's folder. Run it from a shell on the person's computer with
Node 22.9 or later, giving the repository root as `--project`:

- `node "<this skill's folder>/scripts/cli.cjs" check --project "<repository root>"` checks the project's UI and prints
  its findings. Add `--json` for the full report.
- `... system --project "<repository root>"` lists the components and tokens it found.
- `... contract --project "<repository root>"` shows the saved rules, if the project has any.

For one app in a monorepo, put its folder, relative to the root, before `--project` (`check apps/web --project ...`).
The check exits 0 when the UI is permitted, 1 for drift a strict contract disallows, and 2 when it could not finish.
An exit of 2 is not a pass.

The checker reads the project's files and writes nothing. It makes no network call. This copy checks when the person
asks: it has no hooks, so it does not check as you write. Check your own UI edits before you hand back when the person
asked for design checks.

If there is no shell, or `node` is missing or older than 22.9, say so plainly in one line and stop. Do not download
Node or another checker, call a hosted service, or guess a verdict.

Detected components are suggestions from the project's own files. Saved rules and the person's instructions govern
their use. Keep the person's React framework, UI library and component APIs. If the project has no readable components
or tokens, carry on with the task: do not invent a design system or install a library. A project with no saved rules is
advisory. Do not offer to set up rules just because there are none.

Report what ran and what it found: the verdict, the files it covered and any limit it names. A line that begins
"For the person:" is for the person: end your reply with its words. Fix drift within the person's request with your
usual edit tools, then check again. If the checker reports a configuration from the older Fragments CLI or Cloud, keep
it and report the limit it names.
