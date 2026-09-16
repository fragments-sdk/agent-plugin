---
name: create
description: Build or change UI using the user's selected Fragments design-system contract, show approved components and token sources, and check the resulting code. Use when the user asks Fragments to create a page, screen, form, or component.
---

# Build with Fragments

Carry the requested UI through contract lookup, composition, checking, and the
best real preview the host can run. Fragments governs the user's selected design
system; do not assume its component library is `@usefragments/ui`.

## Choose the available connection

- In a configured coding project with the plugin's `fragments-workspace` MCP,
  use `contract({})`. Read relevant project instructions and Fragments config.
  Follow [local tools and previews](references/local.md).
- With a connected Fragments Cloud MCP, use `design_system/contract({})`.
  Follow [hosted tools and checking](references/hosted.md). The OAuth connection
  selects the account/project; a prompt alone does not change that scope.

Use the selected connection consistently. If both exist, the coding project's
configured contract governs its files; do not combine tools from a different
Cloud scope. Report an authentication, missing-runtime, stale-contract, or
project-selection error and follow its specific recovery instructions. Continue
independent work; never silently substitute an unconnected catalog.

## Show the contract receipt

Before composing, show a compact text receipt using the tool's returned values:

> **Fragments · contract v{version} · {short FCID}**
> {componentCount} approved component names · {tokenCount} approved token names
> Token sources: {returned source paths}
> Contract verified; page check pending.

Use the returned count semantics. Separately approved compound or internal names count individually; member-only
entries and alternative source paths add no count. This is not a count of distinct
widget families. For local policy say **Local policy**, not
Cloud-verified. Report unavailable counts or source coverage honestly. Source
paths may belong to an upstream design-system repository. Link only files or
repository locations actually available to the host. Do not invent links or
claim token values are frozen solely because their names are approved.

## Compose and check

Retrieve only the approved components and tokens needed for the requested
layout. Verify import addresses and supported props from tool evidence or the
actual source available to the host; display names and file paths are not
import specifiers. Missing APIs are a real dependency, not permission to invent
props. Keep useful work moving and identify the missing evidence specifically.

Reuse the project's architecture and styling conventions, including CSS Modules
where present. Build accessible labels, validation, keyboard focus, responsive
layout, and useful local interactions. Label demo-only persistence accurately.

Check the completed files locally, or submit the actual generated code to the
hosted checker. Fix findings and recheck changed code. Contract verification and
code verification are separate. An excluded file, insufficient coverage,
unavailable authority, or failed check is not a pass. Do not change the contract,
add exemptions, or suppress findings to make generated code pass. Contract edits
require a user request to change the design system, not merely to build a page.

## Show the result and its evidence

In a coding environment, run relevant type/build checks and open the actual app
preview. In chat, use an available runnable artifact/preview only when it can
load the real dependencies; otherwise deliver checked source and state what
prevents execution. The MCP server does not run a user's local dev server or
supply an embedded page renderer. Never simulate a successful preview.

Preserve configured hooks. A skill is guidance, not enforcement. Report hook
events only when observed in this session: a PostToolUse check is after a write,
and an advisory finding did not block that write. Do not deliberately add a
violation unless the user requests an enforcement demonstration.

Finish with the preview or source artifact, the contract used, actual check
result and coverage, and any material unverified behavior. Keep the work central.
