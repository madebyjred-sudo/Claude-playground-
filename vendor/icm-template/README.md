# ICM — Interpretable Context Methodology

A skill-based approach to organizing AI workflows using folder structure — based on the [Interpretable Context Methodology](https://github.com/RinDig/Model-Workspace-Protocol-MWP-) research paper by Jake Van Clief and David McDermott, extended with Karpathy's LLM knowledge base pattern.

**The core idea:** Instead of building multi-agent frameworks, use plain-text markdown files to give any LLM immediate spatial orientation in your workspace. Two files at the root (`IDENTITY.md` and `CONTEXT.md`) eliminate the "let me explore your filesystem" wasted turns at the start of every session.

**The key framing:** The LLM is a **compiler**, not a chatbot. Stage contracts define specific inputs and structured outputs. The LLM reads sources, compiles structured deliverables, and writes them to specific locations. Conversations happen during review gates, not during execution.

## Quick Start — Install the Skills

Copy the skills folder into your Claude Code skills directory:

```bash
# Clone this repo
git clone https://github.com/ktncodes/icm-template.git

# Copy all skills to your Claude Code skills
cp -r icm-template/SKILLS/icm-scaffold ~/.claude/skills/icm-scaffold
cp -r icm-template/SKILLS/icm-sync ~/.claude/skills/icm-sync
cp -r icm-template/SKILLS/icm-context-scaffold ~/.claude/skills/icm-context-scaffold
```

Then in any Claude Code session:

| Skill | Purpose |
|-------|---------|
| `/icm-scaffold` | Set up ICM on a project — generates IDENTITY.md, CONTEXT.md, _config/ |
| `/icm-sync` | Keep ICM routing accurate — syncs IDENTITY.md and CONTEXT.md with disk |
| `/icm-context-scaffold` | Fill gaps — generates missing CONTEXT.md files across the workspace |

## What You Get

The skill generates an ICM layer on top of your existing project:

```
your-project/
├── IDENTITY.md     # Layer 0 — "Where am I?" (workspace map)
├── CONTEXT.md      # Layer 1 — "Where do I go?" (task routing)
├── _config/        # Layer 3 — "What rules apply?" (conventions, glossary, voice)
│   ├── conventions.md
│   ├── glossary.md
│   ├── voice.md
│   └── article-template.md  (if content generation project)
└── [your existing folders stay untouched]
```

**Quick mode (default):** 3 layers — routing and reference only. Adds ICM to an existing project without restructuring.

**Full mode:** 5 layers — adds physical stage folders with contracts and output directories. For new pipelines built from scratch.

## The Five Layers

| Layer | File | Question | Budget |
|-------|------|----------|--------|
| 0 | `IDENTITY.md` | "Where am I?" | ~800 tokens |
| 1 | Root `CONTEXT.md` | "Where do I go?" | ~300 tokens |
| 2 | Stage `CONTEXT.md` | "What do I do?" | 200-500 tokens |
| 3 | `_config/`, `references/` | "What rules apply?" | 500-2k tokens |
| 4 | `output/` | "What am I working with?" | varies |

Each stage loads only its own context — typically 2,000-8,000 focused tokens instead of a bloated 30,000-50,000 token monolithic prompt.

## The Compilation Metaphor

Karpathy's LLM knowledge base architecture (raw → compile → wiki → Q&A) maps directly onto ICM stages. The skill supports a **knowledge compilation pipeline** archetype:

| Karpathy Stage | ICM Equivalent | What Happens |
|---------------|---------------|-------------|
| **Raw** | Layer 4 inputs | Source documents, notes, transcripts — unstructured |
| **Compile** | Stage 2 | LLM reads raw sources → produces structured articles with citations |
| **Wiki** | Layer 4 outputs | Compiled, cross-referenced articles organized by topic |
| **Q&A** | Layer 1 routing | LLM reads index files to navigate compiled knowledge |

When a project involves knowledge compilation, the skill generates a **section-to-source mapping** — a table that tells the LLM exactly which raw files to read for each output section. This eliminates guessing.

## The Five Principles

1. **One stage, one job** — each stage does one thing and writes to its own output folder
2. **Plain text as the interface** — markdown files, no binary formats or databases
3. **Layered context loading** — load only what the current stage needs
4. **Every output is an edit surface** — review and edit between stages
5. **Configure the factory, not the product** — set up once, produce repeatedly

## Model Support

ICM works with any AI tool. `IDENTITY.md` is model-agnostic. The skill can optionally generate adapter files:

| Tool | Adapter File |
|------|-------------|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursorrules` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Windsurf | `.windsurfrules` |

## Documentation

- [Methodology](docs/methodology.md) — full explanation of the ICM approach
- [Best Practices](docs/best-practices.md) — writing effective stage contracts and reference material
- [Layer Reference](docs/layer-reference.md) — quick reference for all five layers
- [Model Adapters](docs/model-adapters.md) — per-tool setup instructions
- [Original Paper](docs/Interpretable_Context_Methdology_.pdf) — the research paper

## Academic Foundation

This project implements and extends ideas from:

> *"Interpretable Context Methodology: Folder Structure as Agent Architecture"*
> Jake Van Clief, David McDermott — Eduba, University of Edinburgh
> https://github.com/RinDig/Model-Workspace-Protocol-MWP-

Extended with Andrej Karpathy's LLM knowledge base architecture (raw → compile → wiki → Q&A) — the compilation metaphor that reframes the LLM as a compiler with defined inputs and structured outputs rather than a conversational chatbot.

## License

MIT
