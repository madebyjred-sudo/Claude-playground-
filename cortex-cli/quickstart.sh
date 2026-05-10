#!/usr/bin/env bash
# quickstart.sh — bootstrap CORTEX-CLI from a fresh clone.
#
# Installs cortex globally so you can run `cortex` from any directory
# without sourcing a venv. Uses `uv tool install` (preferred) or falls
# back to a local venv install.
#
# Usage:
#   ./quickstart.sh
# or:
#   bash quickstart.sh
#
# After this finishes, just run:
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

     ___/\/\/\/\/\____/\/\/\/\____/\/\/\/\/\____/\/\/\/\/\/\__/\/\/\/\/\/\__/\/\____/\/\_
    _/\/\__________/\/\____/\/\__/\/\____/\/\______/\/\______/\______________/\/\/\/\___
   _/\/\__________/\/\____/\/\__/\/\/\/\/\________/\/\______/\/\/\/\/\________/\/\_____
  _/\/\__________/\/\____/\/\__/\/\__/\/\________/\/\______/\/\____________/\/\/\/\___
 ___/\/\/\/\/\____/\/\/\/\____/\/\____/\/\______/\/\______/\/\/\/\/\/\__/\/\____/\/\_
____________________________________________________________________________________

  el cuaderno cognitivo · quickstart

BANNER

# 1. Python check
info "verificando python..."
if ! command -v python3 >/dev/null 2>&1; then
  fail "python3 no encontrado. instalá Python 3.10+ (brew install python@3.12 en mac)."
fi
PY_VERSION=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
ok "python ${PY_VERSION}"

# 2. uv check (install if missing)
if ! command -v uv >/dev/null 2>&1; then
  warn "uv no encontrado. lo instalo ahora (gestor moderno de Python, requerido para cortex global)..."
  curl -LsSf https://astral.sh/uv/install.sh | sh
  # Make uv available in this shell session
  export PATH="$HOME/.local/bin:$PATH"
  if ! command -v uv >/dev/null 2>&1; then
    fail "uv no quedó disponible. abrí un terminal nuevo y volvé a correr ./quickstart.sh"
  fi
  ok "uv instalado"
else
  ok "uv ya disponible"
fi

# 3. Install cortex as a global tool
info "instalando cortex como herramienta global..."
# --force so re-runs upgrade an existing install cleanly
uv tool install --force --editable . >/dev/null 2>&1 || {
  warn "uv tool install falló, reintentando sin --editable..."
  uv tool install --force . >/dev/null 2>&1 || fail "uv tool install falló. corré manualmente: uv tool install --editable ."
}
ok "cortex instalado globalmente"

# 4. Make sure uv tool bin dir is on PATH
UV_BIN_DIR="$(uv tool dir --bin 2>/dev/null || echo "$HOME/.local/bin")"
if ! command -v cortex >/dev/null 2>&1; then
  warn "el comando 'cortex' no está en tu PATH todavía."
  warn "agregá esta línea a tu ~/.zshrc o ~/.bashrc:"
  printf "\n      export PATH=\"%s:\$PATH\"\n\n" "$UV_BIN_DIR"
  warn "después abrí un terminal nuevo y corré: cortex"
  exit 0
fi

# 5. Verify version
ok "cortex --version: $(cortex --version)"
ok "ubicación: $(command -v cortex)"

cat <<'NEXT'

  ╭───────────────────────────────────────────────────────────╮
  │                                                           │
  │   ✓  todo listo. para arrancar la TUI desde cualquier     │
  │      directorio:                                          │
  │                                                           │
  │      cortex                                               │
  │                                                           │
  │   subcomandos directos:                                   │
  │                                                           │
  │      cortex update          # aplicar updates del clipboard
  │      cortex browse          # ver córtex existentes
  │      cortex --help          # ayuda                       │
  │                                                           │
  ╰───────────────────────────────────────────────────────────╯

NEXT
