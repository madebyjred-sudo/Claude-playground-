# Interpretable Context Methodology (ICM)

This project implements ideas from the research paper *"Interpretable Context Methodology: Folder Structure as Agent Architecture"* by Jake Van Clief and David McDermott (Eduba, University of Edinburgh), extended with Andrej Karpathy's LLM knowledge base architecture (raw → compile → wiki → Q&A).

Original paper: https://github.com/RinDig/Model-Workspace-Protocol-MWP-

---

## Core Idea

Instead of building multi-agent frameworks to coordinate AI workflows, use **folder structure and plain-text files**. Each folder is a step. Inside each folder, a markdown file tells the AI what to do. The AI reads the right folder at the right moment, does its work, and drops the result where the next step can pick it up.

**The LLM is a compiler, not a chatbot.** Each stage has defined inputs and structured outputs. The LLM reads source material and produces a specific deliverable — it does not explore, brainstorm, or converse during execution. Conversations happen during human review gates between stages, not within them.

---

## Five-Layer Context Hierarchy

The methodology organizes context into five layers, each answering a specific question:

| Layer | File | Question | Token Budget |
|-------|------|----------|-------------|
| 0 | `IDENTITY.md` | "Where am I?" | ~800 |
| 1 | Root `CONTEXT.md` | "Where do I go?" | ~300 |
| 2 | Stage `CONTEXT.md` | "What do I do?" | 200-500 |
| 3 | `_config/`, `references/` | "What rules apply?" | 500-2k |
| 4 | `output/` | "What am I working with?" | varies |

**Layers 0-2** are structural — they route the agent to the right place.
**Layer 3** is reference material — stable across runs (voice guides, conventions, templates).
**Layer 4** is working artifacts — changes every run (outputs from previous stages).

### Why This Matters

Research shows that LLMs perform worse when relevant information is buried in long contexts (Liu et al., "Lost in the Middle"). By loading only the context each stage needs, the model works with a focused 2,000-8,000 token window instead of a bloated 30,000-50,000 token monolithic prompt.

---

## Five Design Principles

### 1. One Stage, One Job
Each stage handles a single step and writes its output to its own folder. A stage that researches does not also draft. A stage that drafts does not also review.

### 2. Plain Text as the Interface
Stages communicate through markdown files. No binary formats, no databases, no proprietary serialization. Anyone with a text editor can inspect or modify any artifact.

### 3. Layered Context Loading
Agents load only the context they need for the current stage. This prevents context window pollution rather than trying to compress it after the fact.

### 4. Every Output Is an Edit Surface
Each stage's output is a file you can open, read, edit, and save before the next stage runs. The human works with visible, editable objects.

### 5. Configure the Factory, Not the Product
Set up your workspace once with your preferences, voice, and structure. After that, each run produces a new deliverable using the same configuration.

---

## Stage Contracts

Each stage defines a contract in its `CONTEXT.md` with three parts:

- **Inputs** — what files to read (Layer 3 references + Layer 4 artifacts from prior stages)
- **Process** — what to do (numbered steps)
- **Outputs** — what to write and where

This contract is both the instruction for the AI and the documentation for the human. The workspace is self-documenting.

---

## Pipeline Flow

```
Stage 1 → [human review] → Stage 2 → [human review] → Stage 3 → [human review] → Done
  ↓                          ↓                          ↓
output/                    output/                    output/
```

At each boundary, the human can:
- Accept the output and proceed
- Edit the output before the next stage reads it
- Re-run the stage with adjusted inputs
- Abandon the run entirely

---

## When to Use This Approach

ICM works well for workflows that are:
- **Sequential** — step 2 follows step 1
- **Reviewable** — a human should check each step's output
- **Repeatable** — the same pipeline runs regularly with different input
- **Knowledge-heavy** — raw source material must be compiled into structured output (Karpathy archetype)

It does **not** replace multi-agent frameworks for:
- Real-time multi-agent collaboration
- High-concurrency systems
- Complex automated branching logic

---

## The Compilation Metaphor

Karpathy's LLM knowledge base architecture maps directly onto ICM stages:

| Karpathy Stage | ICM Equivalent | What Happens |
|---------------|---------------|-------------|
| **Raw** | Layer 4 inputs | Source documents, notes, transcripts, code — unstructured |
| **Compile** | Stage 2 (the core stage) | LLM reads raw sources, produces structured articles with citations |
| **Wiki** | Layer 4 outputs | Compiled, cross-referenced articles organized by topic |
| **Q&A** | Layer 1 routing | LLM reads index files to navigate compiled knowledge |

**Why this matters for ICM:** The compilation metaphor changes how you write stage contracts. Instead of "help me research this topic" (vague, open-ended), the contract says "read these 3 source files, produce a structured article following this template, cite every claim." The LLM has a defined job with clear boundaries.

The **section-to-source mapping** is the compiler's lookup table — a markdown table in CONTEXT.md that maps each output section to the specific raw source files that feed it. This eliminates the LLM guessing which files matter.

---

## Index Files for Scaling Layer 3

When a `_config/` or `references/` folder grows past ~10 files, the LLM can't efficiently load everything into context. The solution is an `_index.md` file with a summary table:

```markdown
| File | Summary |
|------|--------|
| conventions.md | Naming patterns, formatting, project-specific standards |
| glossary.md | Domain terms and definitions |
| voice.md | Tone, audience, vocabulary |
| ... | ... |
```

The LLM reads the index to decide which references to load for the current task, rather than loading all of Layer 3. This preserves ICM's core principle of layered context loading as the workspace scales.

---

## Further Reading

- Original paper: *"Interpretable Context Methodology: Folder Structure as Agent Architecture"* — Van Clief & McDermott
- MWP repository: https://github.com/RinDig/Model-Workspace-Protocol-MWP-
- Karpathy's LLM knowledge base architecture (raw → compile → wiki → Q&A)
- Liu et al., "Lost in the Middle: How Language Models Use Long Contexts" (2024)
