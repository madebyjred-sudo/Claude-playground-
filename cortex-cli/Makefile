.PHONY: help install dev run test clean

help:  ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

install:  ## bootstrap venv + install cortex-cli editable
	@bash quickstart.sh

dev:  ## install dev tools (pytest, ruff)
	pip install --quiet pytest ruff

run:  ## launch the TUI
	cortex

update:  ## go straight to the update flow
	cortex update

browse:  ## list existing cortexes
	cortex browse

test:  ## run the smoke test (requires /tmp/test-inbox/codigo_etica_mincyt.pdf)
	python3 tests/smoke_test.py

clean:  ## remove caches and build artifacts
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
	rm -rf build/ dist/ .pytest_cache/ .ruff_cache/
