# Model Adapters

ICM uses `IDENTITY.md` as the model-agnostic identity file. Since different AI tools auto-load different filenames, the `/icm-scaffold` skill can generate adapter files that copy the IDENTITY.md content into the tool-specific file.

## Supported Tools

| Tool | Auto-loaded file |
|------|-----------------|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursorrules` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Windsurf | `.windsurfrules` |

## Setup by Tool

### Claude Code
1. Run `/icm-scaffold` and select Claude Code as the model adapter
2. The skill creates `CLAUDE.md` with the contents of `IDENTITY.md`
3. Claude Code auto-loads `CLAUDE.md` when you open the workspace

### Cursor
1. Run `/icm-scaffold` and select Cursor as the model adapter
2. The skill creates `.cursorrules`
3. Cursor reads `.cursorrules` from the project root

### GitHub Copilot
1. Run `/icm-scaffold` and select Copilot as the model adapter
2. The skill creates `.github/copilot-instructions.md`
3. Copilot reads instructions from this path

### Windsurf
1. Run `/icm-scaffold` and select Windsurf as the model adapter
2. The skill creates `.windsurfrules`

### Other Tools / Manual Setup
If your tool doesn't auto-load a specific file:
1. Open `IDENTITY.md` and copy its contents
2. Paste it into your tool's system prompt or instructions field
3. At the start of each session, also paste the relevant stage's `CONTEXT.md`

## Important Notes

- **Always edit `IDENTITY.md`**, not the adapter files. Adapter files are generated from it.
- Adapter files include a header comment marking them as auto-generated.
- Re-run `/icm-scaffold` after structural changes (new stages, renamed folders, etc.) to regenerate adapters.
- You can commit adapter files to git or add them to `.gitignore` — your choice.
