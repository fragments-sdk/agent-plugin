---
name: design-system-pass
description: Look up a selected Fragments contract and check UI against its approved components and tokens. Use for Fragments-governed UI changes or explicit design-system compliance questions.
---

# Fragments contract lookup and verification

Scope the check to the requested surface. Retrieve its current contract, use
proven imports and supported component APIs, and report what was actually checked.

## Select the available tools

In a configured coding project, use the checkout MCP `contract`, `search`, `get`,
`tokens`, then `check({path})` for affected saved UI files. Read relevant project
configuration. Follow the installed CLI's `doctor` recovery advice for authority
errors; do not replace a selected Cloud contract with an unconnected catalog.

With a hosted Fragments connection, use `design_system/contract({})`, then
`design_system/list_primitives({approvedOnly:true})` and
`design_system/list_tokens({approvedOnly:true})`. The OAuth connection determines
scope. The default catalog may contain candidates; do not infer their approval.
Source paths are definitions, not necessarily import specifiers or local files.

For hosted checks submit the relevant source as
`design_system/conform({code,filename,apply:"none"})`. To repair and validate,
use `design_system/prove_compliant({code,filename,allowSampling:false})`, inspect
the returned code and residual findings, and recheck later changes. It checks
the submitted code, not a repository path. A pass requires a passing verdict,
evaluated coverage, and the intended contract. Report insufficient coverage as
unverified; do not equate “no rewrite” with compliance.

## Preserve the design goal and the evidence

Use the application's styling patterns and actual token sources. Do not edit
contracts, add exemptions, or suppress findings to make code pass. A contract
edit is a separate user-requested change to governance. Preserve configured hooks
and distinguish observed post-write/advisory feedback from blocked writes.

Inspect relevant rendering and interactions when UI changes. Report the contract
pin, files or snippets checked, actual findings, and remaining uncertainty. A
clean governance result alone does not prove the user flow works.
