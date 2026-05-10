#!/usr/bin/env bash
# quickstart.sh — bootstrap CORTEX-CLI from a fresh clone.
#
# Creates a virtual environment, installs cortex-cli in editable mode,
# and runs `cortex --help` to verify everything works.
#
# Usage:
#   ./quickstart.sh
# or:
#   bash quickstart.sh
#
# After this finishes, activate the venv and launch the TUI:
#   source .venv/bin/activate
#   cortex

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

# Pretty output
ok() { printf "  \033[32m✓\033[0m %s\n" "$1"; }
info() { printf "  \033[36m▸\033[0m %s\n" "$1"; }
warn() { printf "  \033[33m!\033[0m %s\n" "$1"; }
fail() { printf "  \033[31m✗\033[0m %s\n" "$1"; exit 1; }

cat <<'BANNER'

  ▒▒▒  CORTEX-CLI · quickstart
  ▒▒▒  el cuaderno cognitivo

BANNER

# 1. Python check
info "verificando python..."
if ! command -v python3 >/dev/null 2>&1; then
  fail "python3 no encontrado. instalá Python 3.10+."
fi
PY_VERSION=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
ok "python ${PY_VERSION}"

# 2. Create venv if missing
if [ ! -d ".venv" ]; then
  info "creando entorno virtual en .venv/..."
  python3 -m venv .venv
  ok "venv creado"
else
  ok "venv ya existe"
fi

# 3. Activate venv (in-shell, this script)
# shellcheck disable=SC1091
source .venv/bin/activate

# 4. Upgrade pip silently
info "actualizando pip..."
pip install --quiet --upgrade pip
ok "pip actualizado"

# 5. Install in editable mode with all deps
info "instalando cortex-cli (editable)..."
pip install --quiet -e .
ok "cortex-cli instalado"

# 6. Verify the entry point
info "verificando comando cortex..."
if ! command -v cortex >/dev/null 2>&1; then
  fail "el comando 'cortex' no quedó disponible. revisá pyproject.toml."
fi
cortex --version >/dev/null
ok "cortex --version: $(cortex --version)"

# 7. Optional: run smoke test if a test PDF is available
if [ -f "/tmp/test-inbox/codigo_etica_mincyt.pdf" ]; then
  info "corriendo smoke test contra PDF de prueba..."
  python3 tests/smoke_test.py >/dev/null && ok "smoke test pasó"
fi

cat <<'NEXT'

  ╭───────────────────────────────────────────────────────────╮
  │                                                           │
  │   ✓  todo listo. para arrancar la TUI:                    │
  │                                                           │
  │      source .venv/bin/activate                            │
  │      cortex                                               │
  │                                                           │
  │   o usá los subcomandos directos:                         │
  │                                                           │
  │      cortex update          # aplicar updates del clipboard
  │      cortex browse          # ver córtex existentes       │
  │      cortex --help          # ayuda                       │
  │                                                           │
  ╰───────────────────────────────────────────────────────────╯

NEXT
