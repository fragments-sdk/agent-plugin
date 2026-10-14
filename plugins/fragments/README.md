<p align="center"><img src="https://raw.githubusercontent.com/fragments-sdk/agent-plugin/main/plugins/fragments/assets/logo.png" width="96" alt="Fragments"></p>

# Fragments in Claude Code and Codex

Your coding agent checks its own UI work against your design system as it writes. It runs the same Drift Engine as the
Fragments app and your CI, so all three give the same answer. You don't need the app open, or installed.

## What it does

- **After each edit**, the agent hears what that edit drifted from: a hand-written colour, size or radius, with your
  system's value beside it.
- **Before it hands back**, the agent fixes the drift it added, or tells you why it kept it.
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
`/hooks` and press `t`. Until Fragments hears from them, it puts a line about this in the first Fragments tool result
in each project, and again every 12 hours, so your agent can tell you. An update that changes the hooks needs trusting
again.

**Updating in Codex** takes one extra step: after `codex plugin marketplace upgrade fragments`, run
`codex plugin add fragments@fragments` again. A new session alone keeps the old version.

## Check it's working

Ask your agent for a small change with a hand-written value, for example:
"add a footer with `padding: 20px`". It should name the Fragments finding and say whether it kept the value.

`claude plugin list` or `codex plugin list` should show `fragments`.

## What it reads and writes

- **Reads** your project's source, on your machine. **Fragments sends nothing off your machine:** it makes no network
  calls. What it tells your agent joins the agent's conversation, like any tool result.
- **Writes to your project only when you say yes** in your host's dialog, and only the files each proposal lists:
  the contract's (`fragments.config.json` and files under `.fragments/`), `AGENTS.md` or `CLAUDE.md` for the
  components it asks agents to use, and, if you add the check to CI, `.github/workflows/fragments-drift.yml`. Nothing
  is committed: commit them to turn them on.
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

Then remove `@usefragments/cli` from your project, and the hooks it installed there (in `.claude/settings.json`,
`.codex/hooks.json` or `.cursor/hooks.json`). Otherwise two engines answer. Delete its files too:
`fragments.config.ts` (or `.js`), `fragments.manifest.json`, `.fragments/manifest.json` and `.fragments/sync.json`.
Delete `.fragments/tokens.json` only if it has `catalogRevision` in it: that one came from the old CLI. Fragments keeps
its own list of approved tokens at the same path, with `"version": 1` and a `tokens` list, so keep that one. While an
old file is there, Fragments can't check your edits, and it tells you so once a session.

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

- **Saying yes needs a dialog.** Claude Code and Codex in a terminal show one; the Codex app has one too, not yet
  tried with Fragments. Claude Code's desktop
  app and print mode (`claude -p`) can't, so Fragments writes nothing there and tells your agent where you can say yes.

- **Shell writes:** a file the agent writes with a shell command, such as `cat > file`, gets no note right after the
  edit. Only edit tools say which files they changed.
- **Values the agent names:** if the agent's closing reply names a drifted value, for example one you asked it to keep,
  Fragments treats it as explained and lets the agent finish.
- **Very large files:** Fragments reads files up to 1 MB. If one of your app's stylesheets is bigger, or a file the
  agent changed is, Fragments doesn't guess: it tells you once a session that it can't check, and why. Other big files,
  such as generated code or data, don't stop it.

## If something's wrong

- **"Fragments is off: it needs Node 22.9 or later":** your `node` is too old. Upgrade it, then restart the session.
- **Codex says nothing about drift:** trust the hooks: type `/hooks` and press `t`.
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
