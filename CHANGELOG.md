# Changelog

## 1.0.0

- **New engine.** The plugin runs the Drift Engine, the same one as the Fragments app and your CI, on your machine. It
  needs Node 22.9 or later, and nothing installed in your project.
- **Hooks for both hosts.** After each edit the agent hears the drift it added; before it hands back, it fixes that
  drift or says why it kept it. Codex asks you to trust the four hooks the next time it starts, and runs them once you
  do. When Fragments can't check an edit, it says why once a session. A renamed or moved file keeps its old drift.
- **Four tools:** `check`, `explain`, `design_system` and `contract`, on the `fragments-drift` server.
- **Removed from 0.9.0:** the `search`, `get` and `tokens` tools and the `fragments-workspace` server; the Fragments
  Cloud contract and the hosted profile; preview opening, `/fragments:create`, and the `create` and `design-system-pass`
  skills. Remove `@usefragments/cli` and the hooks it installed in your projects.
- **License:** changed from FSL-1.1-MIT to the Fragments Local Use License. Versions 0.9.0 and earlier stay under
  FSL-1.1-MIT, as released.

## 0.9.0

First release, under FSL-1.1-MIT.
