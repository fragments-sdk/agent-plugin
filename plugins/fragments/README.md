# Fragments agent plugin

**Build with your design system.** Show the contract, use approved components and
tokens, check the code, and open a real preview where the coding host supports it.

Fragments works with your selected design system. It does not require the
Fragments React component library.

## Codex and Claude Code: local project integration

Requirements: Node.js compatible with the CLI, project-local
`@usefragments/cli >=3.2.0`, an initialized Fragments project, and the app's usual
dependencies. For a connected project, sign in and select its Fragments Cloud
contract using the CLI's setup workflow. Run `fragments doctor` for recovery.

From the project, install the CLI with your package manager, for example:

```sh
npm install --save-dev @usefragments/cli@^3.2.0
npx fragments --help
npx fragments doctor
```

Add this repository as a plugin marketplace:

```sh
# Codex CLI
codex plugin marketplace add fragments-sdk/agent-plugin
codex plugin add fragments@fragments

# Claude Code CLI
claude plugin marketplace add fragments-sdk/agent-plugin
claude plugin install fragments@fragments
```

Start a fresh task/session, then invoke:

```text
Codex:       @fragments create me a settings page
Claude Code: /fragments:create create me a settings page
```

The local package connects `fragments-workspace` to the project's own CLI. Its
five tools are `contract`, `search`, `get`, `tokens`, and `check`. It does not
download a runtime, select a design system, or install duplicate hooks. Existing
CLI setup owns hook installation and mode. A selected Cloud failure never falls
back silently to local policy.

The contract receipt reports approved component names (which can include compound
exports), approved token names and source coverage. A separate saved-file check
reports what code was evaluated. The host runs and inspects the actual app preview.
Terminal hosts show its local URL; desktop hosts can open their browser pane.

## Fragments Cloud: hosted integration

The hosted profile connects to `https://app.usefragments.com/api/mcp`. Sign in to
Fragments through the host's OAuth connection flow and select the allowed
organization/project. No local CLI is required for this profile.

The skill uses `design_system/contract`, approved-only component/token lookup,
and `conform` / `prove_compliant` on submitted code. Repository paths in a
response identify sources; the server cannot read laptop files by path. A coding
host can combine this with its own checkout and preview. Ordinary chat receives
checked source; this release does not include an embedded page renderer.

Public directory availability depends on OpenAI review and publication. A GitHub
marketplace installation is separate from an official directory listing.

## Hooks and proof

A skill guides the agent; it is not a write enforcement boundary. Fragments
preserves configured hooks and reports actual evidence. PostToolUse checks happen
after a write. Advisory feedback does not mean a write was prevented. A passing
contract/code check does not replace build, interaction, or accessibility checks.

## Build release artifacts (source repository)

The maintained source lives in the Fragments repository at `plugins/codex`.
From that source checkout:

```sh
node --test plugins/codex/scripts/mcp-launcher.test.cjs plugins/codex/scripts/package.test.mjs
node plugins/codex/scripts/distribution.mjs /absolute/empty/output-directory
```

Output:

- `local/`: clean public marketplace repository for Codex and Claude Code.
- `hosted/fragments/`: portable remote-MCP plugin with compatibility manifests.
- `fragments-local-0.9.0.zip`: local marketplace bundle.
- `fragments-hosted-0.9.0.zip`: hosted plugin bundle.
- `fragments-skills-0.9.0.zip`: skill bundle for the OpenAI **With MCP** submission.
- `SHA256SUMS`: archive checksums.

Only allowlisted plugin files ship. No private application/runtime source,
credentials, reviewer data, user logs, or development tests are bundled. Build
outputs must be empty so a stale local server cannot leak into a hosted package.
The brand assets are preserved. The license is FSL-1.1-MIT; see `LICENSE`.

## Support

[Report a plugin issue](https://github.com/fragments-sdk/agent-plugin/issues).
For account or privacy requests, contact hello@usefragments.com.

[Website](https://usefragments.com) ·
[Privacy](https://usefragments.com/privacy) ·
[Terms](https://usefragments.com/terms)
