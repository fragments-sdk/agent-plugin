<p align="center"><img src="https://raw.githubusercontent.com/fragments-sdk/agent-plugin/main/plugins/fragments/assets/logo.png" width="96" alt="Fragments"></p>

# Fragments in Claude Code and Codex

Your coding agent checks its own UI work against your design system as it writes. It runs the same Drift Engine as the
Fragments app and your CI, so all three give the same answer. You don't need the app open, or installed.

## What it does

- **After each edit**, the agent receives source locations for advisory findings, or detailed findings with your
  system's value under a strict contract. A completed comparison with no new drift gets a short confirmation.
- **Before it hands back**, the plugin reports new drift. Only an explicit strict contract may hold the turn for
  a repair or an explanation; unconfigured and advisory projects receive suggestions.
- **Before writing UI**, the agent can read your tokens and components, so it starts from what you already have.
- **Change the contract from the terminal.** Ask your agent to approve a token, set the components to build with, or
  add the check to CI. It shows you what would change; Fragments then asks you in Claude Code's or Codex's own dialog,
  and writes only if you tick its box and accept. Nothing is committed, and your agent can undo the last change. The
  dialog covers what Fragments writes; your agent's own edits are your host's to ask about.
- **A receipt for each turn.** When a turn ends with drift fixed, kept or still open, you see one line, such as
  `Fragments receipt: 3 fixed, 1 kept, 0 open`, and the file with the details.
- **In CI,** the check writes the same lines to the run's summary page on GitHub, once the project's checker is this
  release's.

It reads CSS, SCSS (including Modules) and class names in React projects. Tested on macOS.

Installing the plugin does not initialize a design system or choose Fragments UI. Detected components belong to
your project's own inventory and are reuse suggestions. Saved rules remain visible, but plugin turns are held
only when `fragments.config.json` explicitly sets `contract.mode` to `"strict"`. A missing mode is advisory for
plugin hooks; the standalone check and CI keep their existing verdict semantics.

Contract setup is optional. The agent starts it only when you ask; a missing contract is not a reason to prompt
you to create one. You can continue building with your current library or no library.

## Review your contract

Ask your agent to review this project's contract. In a host that supports MCP Apps, `contract_review` shows
components, tokens, spacing and check settings. Select **Review changes**, inspect the proposed files, then choose
**Save changes** to confirm those exact changes. **Undo last save** shows the saved change; **Confirm undo**
restores its files if they have not changed since. **Not now** leaves pending choices unsaved.

The panel owns contract confirmation. Your host may additionally ask permission to run its write tool, and
its restrictions still apply. Panel Save does not require MCP form elicitation or a change of permission mode.
A denied call is not retried through another writer. Expired or stale proposals need a fresh review; an uncertain
write outcome is checked before another write is allowed. Nothing is committed.

In a terminal, your agent shows the same state and proposed changes as text. The model-facing `contract_save`
and `contract_undo` still require native confirmation. If that connection cannot display it or its approval
policy automatically declines it, text inspection and proposals work but those tools do not write. The panel
is the portable confirmation path in graphical hosts; all terminal permission modes are not certified.

The local Claude Code/Codex plugin installation does not also register a cloud ChatGPT connector or a Claude
Desktop extension. Panel support, permission handling and app-only tool isolation must be tested on the actual
connection. A browser/protocol harness does not establish native compatibility.

**Native acceptance, 15 October 2026:** the revised panel saved and undid an advisory contract in Codex desktop
26.1007.71326 Full access and Claude Desktop 2.37337.1 (macOS). Claude's connection had no native elicitation;
panel Save/Undo issued none. Cancelling Undo kept the saved files. Both completed Undo tests restored the
exact starting files. This verifies those desktop configurations, not every host version or terminal mode.

## Before you start

- **Node 22.9 or newer.** Run `node --version`. macOS doesn't come with Node: get it from nodejs.org, or
  `brew install node`.
- **Claude Code or Codex**, installed and signed in.

## Install in Claude Code

```bash
claude plugin marketplace add fragments-sdk/agent-plugin
```

```bash
claude plugin install fragments@fragments
```

Restart any Claude Code session that's already open.

**Install it once.** If you turned Fragments on in Claude's plugin directory, Claude Code already has it as
`fragments@synced`: don't install it here too. Keep one or the other, so only one Fragments answers.

## Install in Codex

```bash
codex plugin marketplace add fragments-sdk/agent-plugin
```

```bash
codex plugin add fragments@fragments
```

**Then trust the hooks, once.** The next time you open Codex, it asks you to review the Fragments hooks: choose **Trust
all and continue**. If you skip it, Codex runs without them and asks again next time; to trust them later, type
`/hooks` and press `t`. If the current connection has not heard from them, Fragments reports that uncertainty once
so your agent can check its edits manually. A hook heard in an earlier connection does not suppress this notice.
An update that changes the hooks needs trusting again. Silence alone does not establish that an edit was checked.

**Updating in Codex** takes one extra step: after `codex plugin marketplace upgrade fragments`, run
`codex plugin add fragments@fragments` again. A new session alone keeps the old version.

## Check it's working

Ask your agent for a small change with a hand-written value, for example:
"add a footer with `padding: 20px`". It should name the Fragments finding and say whether it kept the value.

`claude plugin list` or `codex plugin list` should show `fragments`.

## What it reads and writes

- **Reads** your project's source, on your machine. **Fragments sends nothing off your machine:** it makes no network
  calls. What it tells your agent joins the agent's conversation, like any tool result.
- **Writes to your project only after you confirm** in the review panel or a supported native host dialog,
  and only the files each proposal lists:
  the contract's (`fragments.config.json` and files under `.fragments/`), `AGENTS.md` or `CLAUDE.md` for the
  components it asks agents to use, and, if you add the check to CI, `.github/workflows/fragments-drift.yml`. Nothing
  is committed. Saved local rules take effect immediately. Commit and push a CI workflow to run it on GitHub.
- It keeps its working files in one folder: in Claude Code, `~/.claude/plugins/data/fragments-fragments`; in Codex,
  `~/.fragments/agent-state`. In it:
  - **Earlier contents of the files a turn changes,** so Fragments can tell what the turn added. Cleared when the turn
    ends.
  - **A git copy of your project's source** (`shadow`): the files it checks, copied the first time in a turn that the
    agent runs a shell command that could write, so Fragments can see what the command changed. Older versions of
    changed files go after an hour; the copy stays until you delete the folder.
  - **Run records** (`sessions`): which files each turn changed, and how long each check took. Kept 7 days.
  - **A compile cache** (`compile-cache`), so the checker starts faster.
  - **Receipts** (`receipts`): one Markdown file per turn that had drift, with the agent's own words on any it kept.
    Kept 30 days.
  - **Undo records** (`changes`, `contract`): the files a contract change wrote, before and after. Deleted after
    7 days, at the next save or the next turn that ends with Fragments' hooks on.
- **Size:** about 27 MB for a repository of 3,800 source files over a week of use. Almost all of it is the git
  copy.
- **To delete it,** remove that folder. Fragments makes a new one the next time it runs.
- **CI** runs the checker pinned in your project at `.fragments/drift.cjs`, added by the Fragments app or by your
  agent with your yes. It is the same file either way.

## Update

```bash
claude plugin marketplace update fragments
```

```bash
claude plugin update fragments@fragments
```

In Codex:

```bash
codex plugin marketplace upgrade fragments
```

```bash
codex plugin add fragments@fragments
```

Codex picks up a new version only when you add the plugin again; a new session isn't enough.

**Using the old plugin (0.9.0)?** Update the same way. 1.0 is a new plugin on a new engine, and it drops some of 0.9.0:

- **The `search`, `get` and `tokens` tools.** The server was `fragments-workspace` and is now `fragments-drift`, with
  `check`, `explain`, `design_system` and `contract`. Permission rules you wrote for the old server stop matching.
- **The Fragments Cloud contract and the hosted profile.** Everything runs on your machine.
- **Opening a preview, and `/fragments:create`**, with the `create` and `design-system-pass` skills. Ask your agent
  directly.

If you choose to migrate that project, preserve its old configuration first and review which rules you want to
carry forward. Remove `@usefragments/cli` and only its hook entries (in `.claude/settings.json`, `.codex/hooks.json`
or `.cursor/hooks.json`) when you retire that engine, so two engines do not answer. Do not delete whole host settings
files or another tool's hooks.

Legacy files can include `fragments.config.ts` (or `.js`), `fragments.manifest.json`, `.fragments/manifest.json`
and `.fragments/sync.json`. A `.fragments/tokens.json` with `catalogRevision` belongs to the old CLI; the current
approved-token file uses `"version": 1` and a `tokens` list. Review and remove only obsolete files after preserving
the policy you need. Until incompatible authority is resolved, Fragments reports incomplete coverage and leaves
the configuration alone; an update does not authorize an automatic migration.

## Uninstall

```bash
claude plugin uninstall fragments@fragments
```

```bash
claude plugin marketplace remove fragments
```

In Codex:

```bash
codex plugin remove fragments@fragments
```

```bash
codex plugin marketplace remove fragments
```

Claude Code deletes what Fragments keeps when you uninstall it (add `--keep-data` to keep it). Codex doesn't: delete
`~/.fragments/agent-state` yourself.

Turned it on in Claude's plugin directory (`fragments@synced`)? Turn it off there.

## Limits

- **Confirmation depends on the surface.** Compatible graphical panels use explicit Save changes and Confirm
  undo; the host must forward app-only tool calls and private metadata. Native model/terminal tools still need
  the host's confirmation dialog. Host permission denials remain in force; rendering alone grants no write access.

- **Shell writes:** a file the agent writes with a shell command, such as `cat > file`, gets no note right after the
  edit. Only edit tools say which files they changed.
- **Values the agent names:** if the agent's closing reply names a drifted value, for example one you asked it to keep,
  Fragments treats it as explained and lets the agent finish.
- **Very large files:** Fragments reads files up to 1 MB. If one of your app's stylesheets is bigger, or a file the
  agent changed is, Fragments doesn't guess: it tells you once a session that it can't check, and why. Other big files,
  such as generated code or data, don't stop it.

## If something's wrong

- **"Fragments is off: it needs Node 22.9 or later":** your `node` is too old. Upgrade it, then restart the session.
- **Codex says nothing about drift:** inspect `/hooks` and trust the hooks if you want automatic checks. Until
  current feedback establishes coverage, ask the agent to run `check` on its edits.
- **Claude Code shows hook errors:** run `node --version` in the same terminal you start Claude Code from.
- **Started from the Dock?** The Claude and Codex apps take your PATH from your login shell. If Fragments doesn't start
  there, check that `node --version` works in a new terminal window.

## Support

[Report an issue](https://github.com/fragments-sdk/agent-plugin/issues) · hello@usefragments.com ·
[Website](https://usefragments.com) · [Privacy](https://usefragments.com/privacy) ·
[Terms](https://usefragments.com/terms) ·
[Changes](https://github.com/fragments-sdk/agent-plugin/blob/main/CHANGELOG.md)

## License

Free to use for your own projects, including commercial ones, under the Fragments Local Use License; see
[LICENSE](LICENSE). Versions 0.9.0 and earlier stay under FSL-1.1-MIT, as released.
