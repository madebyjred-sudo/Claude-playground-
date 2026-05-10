#!/usr/bin/env bash
# install.sh — one-line installer for CORTEX-CLI.
#
# Usage:
#   curl -LsSf https://raw.githubusercontent.com/madebyjred-sudo/CORTEX-CLI/main/install.sh | sh
#
# This installs:
#   1. `uv` (the Python tool manager) — if not already present
#   2. `cortex-cli` from GitHub via `uv tool install`
#
# After it finishes, open a new terminal and type:  cortex

set -e

REPO="${CORTEX_REPO:-git+https://github.com/madebyjred-sudo/CORTEX-CLI}"
UV_BIN_DIR="$HOME/.local/bin"

# Pretty output
GREEN="\033[32m"; CYAN="\033[36m"; YELLOW="\033[33m"; RED="\033[31m"; DIM="\033[2m"; RESET="\033[0m"
ok()   { printf "  ${GREEN}✓${RESET} %s\n" "$1"; }
info() { printf "  ${CYAN}▸${RESET} %s\n" "$1"; }
warn() { printf "  ${YELLOW}!${RESET} %s\n" "$1"; }
fail() { printf "  ${RED}✗${RESET} %s\n" "$1"; exit 1; }

cat <<'BANNER'

     ___/\/\/\/\/\____/\/\/\/\____/\/\/\/\/\____/\/\/\/\/\/\__/\/\/\/\/\/\__/\/\____/\/\_
    _/\/\__________/\/\____/\/\__/\/\____/\/\______/\/\______/\______________/\/\/\/\___
   _/\/\__________/\/\____/\/\__/\/\/\/\/\________/\/\______/\/\/\/\/\________/\/\_____
  _/\/\__________/\/\____/\/\__/\/\__/\/\________/\/\______/\/\____________/\/\/\/\___
 ___/\/\/\/\/\____/\/\/\/\____/\/\____/\/\______/\/\______/\/\/\/\/\/\__/\/\____/\/\_
____________________________________________________________________________________

  el cuaderno cognitivo

BANNER

# 1. Make sure ~/.local/bin is on PATH for this script's lifetime
export PATH="$UV_BIN_DIR:$PATH"

# 2. Install uv if not present
if ! command -v uv >/dev/null 2>&1; then
  info "instalando uv (necesario una sola vez)..."
  curl -LsSf https://astral.sh/uv/install.sh | sh >/dev/null 2>&1 || \
    fail "no pude instalar uv. probá: curl -LsSf https://astral.sh/uv/install.sh | sh"
  export PATH="$UV_BIN_DIR:$PATH"
  command -v uv >/dev/null 2>&1 || fail "uv no quedó disponible. abrí un terminal nuevo y volvé a correr esto."
  ok "uv instalado"
else
  ok "uv ya disponible"
fi

# 3. Install cortex from the public repo
info "instalando cortex..."
uv tool install --force "$REPO" >/dev/null 2>&1 || \
  fail "uv tool install falló. probá manualmente: uv tool install --force '$REPO'"
ok "cortex instalado"

# 4. Verify
if command -v cortex >/dev/null 2>&1; then
  CORTEX_PATH="$(command -v cortex)"
  CORTEX_VERSION="$(cortex --version 2>/dev/null || echo '?')"
  ok "version: $CORTEX_VERSION"
  printf "  ${DIM}ubicación: %s${RESET}\n" "$CORTEX_PATH"

  # Make sure the user's shell config has ~/.local/bin on PATH for future sessions
  SHELL_CONFIG=""
  case "${SHELL##*/}" in
    zsh)  SHELL_CONFIG="$HOME/.zshrc" ;;
    bash) SHELL_CONFIG="$HOME/.bashrc" ;;
    fish) SHELL_CONFIG="$HOME/.config/fish/config.fish" ;;
  esac
  if [ -n "$SHELL_CONFIG" ] && [ -f "$SHELL_CONFIG" ]; then
    if ! grep -q "$UV_BIN_DIR" "$SHELL_CONFIG" 2>/dev/null; then
      warn "agregando $UV_BIN_DIR a tu PATH en $SHELL_CONFIG..."
      printf '\n# added by cortex installer\nexport PATH="%s:$PATH"\n' "$UV_BIN_DIR" >> "$SHELL_CONFIG"
      ok "PATH actualizado"
    fi
  fi

  cat <<'NEXT'

  ╭───────────────────────────────────────────────────────────╮
  │                                                           │
  │   ✓  listo. abrí un terminal nuevo y escribí:             │
  │                                                           │
  │      cortex                                               │
  │                                                           │
  ╰───────────────────────────────────────────────────────────╯

NEXT
else
  warn "cortex se instaló pero no está en tu PATH actual."
  warn "agregá esta línea a tu shell config y abrí un terminal nuevo:"
  printf "\n      export PATH=\"%s:\$PATH\"\n\n" "$UV_BIN_DIR"
fi
