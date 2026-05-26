# Best Practices for ICM Workspaces

## Writing IDENTITY.md (Layer 0)

- Keep it under 800 tokens (~3,200 characters)
- Include: workspace name, purpose, folder tree, stage table, rules
- Use the `/icm-scaffold` skill to generate — or write by hand following the template
- This file answers: "Where am I and what does this workspace contain?"

## Writing Root CONTEXT.md (Layer 1)

- Keep it under 300 tokens
- Include: routing table (task → stage folder), session start instructions, shared resource links
- This file answers: "Given what I want to do, where do I go?"

## Writing Stage Contracts (Layer 2)

### Structure
Every stage CONTEXT.md must have these sections:

```markdown
# Stage: [Name]
## Purpose — one sentence
## Inputs — Layer 3 refs + Layer 4 artifacts with file paths
## Process — numbered steps
## Outputs — filename pattern → output/
## Routing — next stage, on-failure behavior
```

### Tips
- **Be specific about inputs.** List exact file paths, not "the previous output."
- **Number your process steps.** The AI follows numbered steps more reliably than prose.
- **Frame as compilation.** Write "read X, produce Y with citations" — not "help me explore X." The LLM is a compiler with defined inputs and outputs.
- **Name your outputs.** A specific filename pattern is better than "write the result."
- **Keep it under 500 tokens.** If your contract is long, the stage is doing too much — split it.

## Writing Reference Material (Layer 3)

### Voice Guide (`_config/voice.md`)
- Define tone, audience, vocabulary preferences
- Include examples of good and bad writing
- This is the most impactful reference file — spend time on it

### Conventions (`_config/conventions.md`)
- File naming patterns
- Folder naming rules
- Formatting standards
- Keep it factual, not aspirational

### Stage-Specific References (`stages/NN/references/`)
- Put guidelines that only apply to one stage here, not in `_config/`
- Examples: outline format templates, review checklists, style examples

### Index Files for Scaling
- When any `_config/` or `references/` folder exceeds ~10 files, add an `_index.md` with a summary table
- Format: `| File | Summary |` — one-line description per file
- The LLM reads the index to choose which references to load, instead of loading everything
- This preserves token efficiency as the workspace grows

## Designing Pipelines

### How to Identify Stages
Ask: "Where are the natural breakpoints where a human should review?"

Common patterns:
- **Content creation:** Research → Draft → Review
- **Data processing:** Extract → Transform → Validate
- **Decision support:** Gather → Analyze → Recommend
- **Knowledge compilation (Karpathy archetype):** Ingest → Compile → Review → Publish

### Stage Sizing
- If a stage takes more than 3 numbered steps, it might be doing too much
- If two stages always run together without review, combine them
- 3-5 stages is the sweet spot for most workflows

### Chaining
- Each stage reads from the previous stage's `output/` folder
- Reference material (`_config/`, `references/`) is stable — used for constraints
- Working artifacts (`output/`) change every run — used as input

## Common Mistakes

1. **Too much in Layer 0.** IDENTITY.md should be a map, not a manual.
2. **Combining stages.** If you're doing research AND drafting in one stage, split them.
3. **Skipping review gates.** The human review between stages is where quality happens.
4. **Editing output instead of source.** If you keep fixing the same thing, update the stage contract or voice guide instead.
5. **Overloading references.** Each stage should load only the references it needs. Don't put everything in `_config/`.
