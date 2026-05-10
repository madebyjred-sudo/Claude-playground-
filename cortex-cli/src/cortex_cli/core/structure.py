"""Generate the CORTEX.md from a list of parsed Documents.

The generator does NOT use an LLM. The "intelligence" is in the convention:
SINAPSIS, HIPOCAMPO, CONEXIONES, ABIERTAS, NOTAS PROPIAS. The LLM that the
user later loads the cortex into is the one that decides what to consolidate,
prune, or migrate — those decisions arrive back as `cortex update`.

What this module does:
  · puts each parsed section under HIPOCAMPO grouped by source document
  · extracts a SINAPSIS draft from real headings + frequent significant terms
  · skips structural titles (Página N, Section N) — those are scaffolding
  · leaves CONEXIONES, ABIERTAS and NOTAS PROPIAS empty (they grow with use)
  · stamps creation date, sources and headers
"""

from __future__ import annotations

import re
from datetime import date
from typing import Iterable

from .ingest import Document


# Stopwords (light) for both Spanish and English — used only to dedupe
# sinapsis candidates. We don't try to be exhaustive; this is signal not search.
_STOPWORDS = set(
    """
    a al algo algun alguna algunas alguno algunos ante antes aquel aquella
    aquellas aquellos aqui asi como con contra cual cuales cuando de del desde
    donde dos durante e el ella ellas ellos en entre era eran eres es esa esas
    ese eso esos esta estaba estaban estado estados estan estar este esto
    estos fue fueron ha haber habia habian han hasta hay hace hacer hacia ido
    la las le les lo los mas me mi mis mucho muchos muy ni no nos nosotros o
    otra otras otro otros para pero poco por porque que quien quienes se sea
    sean ser si sin sobre soy su sus tal tambien tampoco tan tanto te tendra
    tener tenia tengo ti tu tus un una unas uno unos vamos varios vez yo
    a an and any are as at be been being but by can could did do does done
    each every for from had has have having he her here hers herself him
    himself his how i if in into is it its itself me more most my myself no
    nor not now of off on once only or other our ours ourselves out over own
    same she should so some such than that the their theirs them themselves
    then there these they this those through to too under until up very was
    we were what when where which while who whom why will with would you your
    yours yourself yourselves
    """.split()
)


def _candidate_terms(text: str, max_terms: int = 30) -> list[str]:
    """Return up to `max_terms` significant terms from text, ordered by
    descending frequency. Heuristic: tokens of length >= 4, not stopwords,
    keeping their original casing for proper nouns."""
    raw = re.findall(r"[A-Za-zÁÉÍÓÚáéíóúÑñ][A-Za-zÁÉÍÓÚáéíóúÑñ\-]{3,}", text)
    counts: dict[str, int] = {}
    for token in raw:
        norm = token.lower()
        if norm in _STOPWORDS:
            continue
        if norm.isnumeric():
            continue
        # Use the most-common surface form for display
        key = token if token[0].isupper() else norm
        counts[key] = counts.get(key, 0) + 1
    # Sort by frequency desc, then alphabetic
    ranked = sorted(counts.items(), key=lambda x: (-x[1], x[0].lower()))
    return [term for term, _ in ranked[:max_terms]]


def _slugify(name: str) -> str:
    s = re.sub(r"[^\w\s-]", "", name).strip().lower()
    return re.sub(r"[\s_-]+", "-", s)[:80] or "seccion"


def generate_cortex_md(
    name: str,
    documents: Iterable[Document],
    *,
    today: date | None = None,
    language: str = "es",
) -> str:
    """Generate the CORTEX.md content for a list of documents."""
    today = today or date.today()
    docs = list(documents)

    if language == "en":
        section_titles = {
            "sinapsis": "SYNAPSE · core concepts",
            "hipocampo": "HIPPOCAMPUS · memory of facts",
            "conexiones": "CONNECTIONS · how they relate",
            "abiertas": "OPEN · unresolved questions",
            "notas": "MY NOTES · interpretations (not facts)",
            "empty": "(this section grows with your conversations. start empty if you want.)",
            "created": "Created",
            "updated": "Last updated",
            "language_label": "Language",
            "sources": "Sources",
        }
    else:
        section_titles = {
            "sinapsis": "SINAPSIS · conceptos núcleo",
            "hipocampo": "HIPOCAMPO · memoria de hechos",
            "conexiones": "CONEXIONES · cómo se relacionan",
            "abiertas": "ABIERTAS · preguntas no resueltas",
            "notas": "NOTAS PROPIAS · interpretaciones (no hechos)",
            "empty": "(esta sección crece con tus conversaciones. empezá vacía si querés.)",
            "created": "Creado",
            "updated": "Última actualización",
            "language_label": "Idioma",
            "sources": "Fuentes",
        }

    # Build SINAPSIS from real conceptual headings + frequent significant terms.
    # Skip generic structural titles (e.g. "Página 5", "Páginas 2–8", "Section 1").
    structural = re.compile(
        r"^(p[áa]gina|pages?|p[áa]ginas|section|sections?|cap[íi]tulo|chapter)\s",
        re.IGNORECASE,
    )
    all_titles = [s.title for d in docs for s in d.sections if s.title]
    full_text = "\n\n".join(s.body for d in docs for s in d.sections)
    candidate_terms = _candidate_terms(full_text, max_terms=30)
    seed_concepts: list[str] = []
    seen: set[str] = set()

    label_extracted = "extraído de las fuentes" if language == "es" else "extracted from sources"
    label_frequent = "término frecuente" if language == "es" else "frequent term"

    for title in all_titles:
        key = title.lower()
        if key in seen:
            continue
        if not (3 <= len(title) <= 90):
            continue
        if structural.match(title):
            continue
        seen.add(key)
        seed_concepts.append(f"- **{title}** · _({label_extracted})_")
        if len(seed_concepts) >= 20:
            break
    for term in candidate_terms:
        if term.lower() in seen:
            continue
        seen.add(term.lower())
        seed_concepts.append(f"- **{term}** · _({label_frequent})_")
        if len(seed_concepts) >= 30:
            break

    out: list[str] = []
    out.append(f"# CORTEX: {name}")
    out.append("")
    out.append(f"> {section_titles['created']}: {today.isoformat()}")
    out.append(f"> {section_titles['updated']}: {today.isoformat()}")
    out.append(f"> {section_titles['language_label']}: {language}")
    out.append(f"> {section_titles['sources']}:")
    for d in docs:
        out.append(f"> - {d.source}")
    out.append("")
    out.append("---")
    out.append("")

    # SINAPSIS
    out.append(f"## {section_titles['sinapsis']}")
    out.append("")
    if seed_concepts:
        out.extend(seed_concepts)
    else:
        out.append(f"> {section_titles['empty']}")
    out.append("")
    out.append("---")
    out.append("")

    # HIPOCAMPO
    out.append(f"## {section_titles['hipocampo']}")
    out.append("")
    for d in docs:
        out.append(f"### · {d.title}")
        out.append("")
        for s in d.sections:
            if not s.body.strip():
                continue
            out.append(f"#### {s.title}")
            out.append("")
            out.append(s.body.strip())
            out.append("")
        out.append("")

    out.append("---")
    out.append("")

    # CONEXIONES
    out.append(f"## {section_titles['conexiones']}")
    out.append("")
    out.append(f"> {section_titles['empty']}")
    out.append("")
    out.append("---")
    out.append("")

    # ABIERTAS
    out.append(f"## {section_titles['abiertas']}")
    out.append("")
    out.append(f"> {section_titles['empty']}")
    out.append("")
    out.append("---")
    out.append("")

    # NOTAS PROPIAS
    out.append(f"## {section_titles['notas']}")
    out.append("")
    out.append(f"> {section_titles['empty']}")
    out.append("")

    return "\n".join(out)
