---
name: check-react-ui
description: Inspect and check saved React UI with the local Fragments engine, including Next.js, Vite, TanStack Start and React Router projects. Use for Fragments static design-system checks; pictures of the rendered pages come from see and judge.
---

## Inspect before editing

- Call `contract` and `design_system` to read saved policy, components, and tokens. Unqueried `design_system` returns a compact summary (up to 30 building blocks and 20 tokens per category); pass `query` (component name, token kind like `spacing` or `colour`, or icon word) for full matches, or `file` to match that file's token spelling.
- Installing this plugin globally does not initialize a project or choose Fragments UI. Detected components are suggestions from the project's own files; saved rules and the person's instructions govern their use.
- Preserve the project's React framework, UI library, and component APIs. If the project has no readable components or tokens, continue the task without inventing a design system or installing a library. General foundations are optional guidance, not adopted rules.

## Check edits and report honestly

- When hooks run, Fragments checks edits and reports what they added. Only an explicit `strict` contract may hold a turn for new drift; `advisory` reports departures without blocking; `off` disables automatic checks while keeping saved choices.
- Hook activity in an earlier connection does not prove coverage now, and silence is never a pass. When design checks are enabled and current hook feedback does not prove your edits were checked, call `check` on the edited files (and any files the person changed) before handing back.
- Report execution state, contract verdict, and material coverage limits. An `incomplete` or unverified result is never a pass, `off` does not claim compliance, and a file-scoped check is not a whole-project verdict.
- Pass any line starting `"For the person:"` verbatim to the person.
- Use a finding's `key` and `reportId` with `explain`. A stale-report response means files or policy changed: run `check` again first.

## Contract changes (user-initiated only)

- Contract setup is optional. Never offer or start setup just because a project has no contract.
- When the person asks to review or edit the contract, call `contract_review` (interactive panel in MCP Apps hosts, text in terminals). When they ask to approve tokens/components, set spacing, or add CI (`part: "check"`, `ci: true`), call `contract_propose` and show every file it writes.
- In the panel, selections stay local until **Review changes**; **Save changes** and **Confirm undo** own confirmation. Never call app-only tools on the person's behalf or invent a confirmation token.
- In terminals, `contract_save` (with the proposal digest) and `contract_undo` require the host's native confirmation dialog. If unavailable or declined, report the limit without substituting another writer or changing host settings. Saved rules take effect immediately; nothing is committed. After a save, undo, or uncertain outcome, read `contract_review` again before reporting state.
- For rendered page screenshots and visual audits, use `see` and `judge` (`see-and-judge-ui`).

## Legacy configs and missing tools

- If the check reports an older Fragments CLI or legacy hosted config, leave it untouched and report the limit named. Do not replace it, infer a second policy, or switch frameworks to obtain a pass.
- If tools fail or are missing, say so plainly; never download another version or call a hosted service.
- If `check`, `design_system`, and `contract` are not in this session, say so plainly in one line before anything else. They load in local MCP hosts (Claude Code, Codex, Cursor, Antigravity); chats without local servers have none of them. Do not review code by eye and call it a Fragments check.
