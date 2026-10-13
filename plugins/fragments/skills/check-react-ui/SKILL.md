---
name: check-react-ui
description: Inspect and check saved React UI with the local Fragments engine, including Next.js, Vite, TanStack Start and React Router projects. Use for Fragments static design-system checks; browser rendering and screenshot inspection require separate tools.
---

Use this plugin's `contract` and `design_system` tools to read the project's saved policy, components and tokens before changing UI. Preserve the user's React framework and existing component APIs.

Fragments checks each edit you make as you make it, tells you what that edit added, and names any drift your turn still has before you hand back. Call `check` only for files you did not edit, or after the person changed something. When you do, report its execution state, contract verdict and material coverage limits. An incomplete result is not a pass. File-scoped checks do not establish a whole-project contract verdict. When Fragments says nothing about your edits, there is nothing to report; if it cannot check them, it says so once. A result that begins "For the person:" carries a line about this plugin's setup or the project that the person needs: end your reply with the words after it, as they are. It means the edit checks are not running or cannot check, so check your own edits too.

Use a finding's stable `key` and the returned `reportId` with `explain`. A stale-report response means the source or policy changed: check again before interpreting that finding. These tools read current files; they do not retain a prior source snapshot.

The tools are `contract`, `design_system`, `check` and `explain`. They do not save policy, accept drift, render pages or make screenshots. Edit source through the coding host's usual tools within the user's request. The Fragments app is optional; what it pictures is separate from this static check.

If the check reports a configuration from the older Fragments CLI or Cloud, keep it and report the limit the check names. Do not replace it, infer a second policy, call another engine as a silent fallback, or switch frameworks to obtain a pass. If the tools fail or are missing, say so: a failure does not authorize downloading another version or calling a hosted service.
