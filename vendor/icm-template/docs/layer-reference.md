# Layer Reference Card

Quick reference for the five-layer context hierarchy.

---

## Layer 0 — Identity (`IDENTITY.md`)

| | |
|---|---|
| **Question** | "Where am I?" |
| **Token budget** | ~800 |
| **Changes between runs** | Only when structure changes |
| **Contains** | Workspace name, folder tree, stage table, rules |
| **Maintained by** | `/icm-scaffold` skill (or manually) |

---

## Layer 1 — Routing (root `CONTEXT.md`)

| | |
|---|---|
| **Question** | "Where do I go?" |
| **Token budget** | ~300 |
| **Changes between runs** | Only when stages are added/removed |
| **Contains** | Task → stage routing table, session start steps, shared resource links |
| **Maintained by** | User (or `/icm-scaffold` skill during initial setup) |

---

## Layer 2 — Stage Contract (stage `CONTEXT.md`)

| | |
|---|---|
| **Question** | "What do I do?" |
| **Token budget** | 200-500 |
| **Changes between runs** | Only when the stage's process changes |
| **Contains** | Inputs, Process (numbered steps), Outputs, Routing |
| **Maintained by** | User |

---

## Layer 3 — Reference Material (`_config/`, `references/`)

| | |
|---|---|
| **Question** | "What rules apply?" |
| **Token budget** | 500-2,000 per stage |
| **Changes between runs** | No — configured once during setup |
| **Contains** | Voice guide, conventions, templates, checklists, style examples |
| **Location** | `_config/` (shared) or `stages/NN/references/` (stage-specific) |
| **Scaling** | Add `_index.md` when folder exceeds ~10 files |
| **Analogy** | The recipe |

---

## Layer 4 — Working Artifacts (`output/`)

| | |
|---|---|
| **Question** | "What am I working with?" |
| **Token budget** | Varies |
| **Changes between runs** | Yes — new content every run |
| **Contains** | Stage outputs, intermediate results, drafts |
| **Location** | `stages/NN/output/` |
| **Analogy** | The ingredients / the product |

---

## Loading Pattern

At any given stage, the model's context window contains:

```
Layer 0  (~800 tok)  — IDENTITY.md (always loaded)
Layer 1  (~300 tok)  — Root CONTEXT.md (loaded at session start)
Layer 2  (~400 tok)  — This stage's CONTEXT.md
Layer 3  (~1k tok)   — Only the references this stage lists in Inputs
Layer 4  (varies)    — Only the prior stage outputs this stage lists in Inputs
─────────────────────
Total: 2,000-8,000 tokens (focused)
vs. monolithic: 30,000-50,000 tokens (unfocused)
```
