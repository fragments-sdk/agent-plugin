---
name: discover-pages
description: Find one real example for missing dynamic page patterns in Fragments All pages, using the project's source and available browser evidence. Investigate missing examples without changing the app or fabricating data.
---

Find one concrete real example per missing dynamic route pattern without editing the app or fabricating data. One example represents each pattern; other records must not add boards.

## Inside Fragments (when `page_coverage` and `page_example` exist)

1. Read `page_coverage` first and keep its returned `scope` unchanged. Investigate only patterns marked eligible (never attempted, or eligible again after source changes). Include previously explained gaps only if the person asks to recheck them. Keep healthy examples and existing choices.
2. Stay within one pass: at most 20 patterns, 40 tool calls, and 5 minutes. Batch source reads and stop once no supported example remains.
3. Do not reload this skill inside Fragments (it is already in turn instructions). Call `pages { picture: false }` for known pages, files, and links, then trace router, navigation, loaders, and fixtures with project-relative `read_file` (use tool search if deferred). Use `look` with a real `path` and source-verified `steps` for runtime evidence. Built-in page and source tools are sufficient; do not skip `read_file` or request broader permissions when shell/browser tools are absent.
4. Prefer visited pages or real links exposed by the running app. Inspect button source before clicking ambiguous navigation controls; never execute arbitrary handlers. Fixtures count only when served by the running app. Never guess IDs, borrow unrelated resource IDs, fabricate tokens/payloads, enumerate APIs, or inspect credentials/auth storage.
5. For each resolved pattern, call `page_example` once with `scope`, `family`, and the real concrete `route`. Registration queues capture; a queued capture is not a successful picture. Let Fragments' planner handle related patterns.
6. For each unresolved eligible pattern, call `page_example` with `scope`, `family`, and `unavailable: { reason, detail }` (concise `detail`, <= 300 chars, naming the unmet prerequisite):
   - Source alone may establish `invitation` or `special-context` (state no example was observed in this pass, never claim none exists).
   - `sign-in`, `empty-data`, and `not-found` require actual runtime evidence. A loading or failed `look` is inconclusive; if neither source nor runtime establishes an outcome, leave the pattern eligible and report the limit.
   - Never mark an unexplored pattern unavailable merely because the pass hit its limit.
7. Read `page_coverage` once more at the end. Report actual pictured, queued, failed, and unresolved results plus remaining prerequisites, then stop.

## Standalone plugin (no `page_coverage` / `page_example`)

Call `page_map` first: it reads routes from source, flags which need an example, and states what source alone cannot know. Trace only the routes needing an example using available read-only source and browser tools. Report source-verified candidate paths and unmet prerequisites; state honestly that they were not registered or pictured. Do not ask for manual MCP setup, change host settings, or block static checks.

## Boundaries

- Never edit source or config, create records, submit forms, send invitations, or alter access to get a picture. Leave sign-in to the person on the app's own page. Never print tokens, JWTs, credentials, or record contents.
- If none of this plugin's tools are in this session, say so plainly in one line. They load in local MCP hosts (Claude Code, Codex, Cursor, Antigravity); `page_map` needs only the plugin, while `page_coverage`/`page_example` also need the Fragments app.
