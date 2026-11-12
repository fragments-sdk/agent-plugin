# Fragments for ChatGPT and Codex

Your agent checks React UI against your project's own design system when you ask: its components, its tokens and any
rules you saved. This is a skills-only plugin for the ChatGPT and Codex desktop apps.

## What it runs

- **One skill, `check-react-ui`.** When you ask for a design check, the agent runs the Fragments checker in the skill's
  `scripts` folder with your own `node` (22.9 or later), in a shell on your computer:
  `node scripts/cli.cjs check --project <your repository>`.
- `scripts/cli.cjs` is the Fragments checker. `scripts/typescript.cjs` is the TypeScript 5.7 compiler it reads your
  source with, loaded from beside it. Both are minified JavaScript, with their licences in `LICENSE` and
  `THIRD_PARTY_NOTICES.txt`.

## What it reads, sends and writes

- **Reads** your project's source files on your computer.
- **Sends nothing.** It makes no network call and fetches nothing. What it reports joins your conversation, like any
  command's output.
- **Writes nothing.** It doesn't change your project, and keeps no files of its own.

## What it doesn't do

It has no hooks, so it checks when you ask, not as the agent writes. It doesn't save rules, draw Frames, or picture
your pages. The full Fragments plugin does those in Codex and Claude Code:
[github.com/fragments-sdk/agent-plugin](https://github.com/fragments-sdk/agent-plugin).

## Support

[Report an issue](https://github.com/fragments-sdk/agent-plugin/issues) · hello@usefragments.com ·
[Privacy](https://usefragments.com/privacy) · [Terms](https://usefragments.com/terms)

## License

Free to use for your own projects, including commercial ones, under the Fragments Local Use License; see
[LICENSE](LICENSE).
