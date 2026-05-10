"""CLI entry point for cortex-cli.

Usage:
    cortex                    -> launch the TUI
    cortex update             -> jump straight to the update screen
                                (reads clipboard automatically)
    cortex --version          -> print version
    cortex --help             -> print help
"""

from __future__ import annotations

import sys


def _print_help() -> None:
    print(
        "cortex-cli · the cognitive notebook\n"
        "\n"
        "USAGE\n"
        "  cortex                 launch the TUI\n"
        "  cortex update          go straight to update flow (reads clipboard)\n"
        "  cortex browse          list existing cortexes\n"
        "  cortex --version       print version\n"
        "  cortex --help          print this help\n"
        "\n"
        "DOCS\n"
        "  https://github.com/madebyjred-sudo/cortex-cli\n"
    )


def _print_version() -> None:
    try:
        from importlib.metadata import version
        print(version("cortex-cli"))
    except Exception:
        print("0.1.0")


def main(argv: list[str] | None = None) -> int:
    args = list(argv if argv is not None else sys.argv[1:])

    if "--help" in args or "-h" in args:
        _print_help()
        return 0
    if "--version" in args or "-v" in args:
        _print_version()
        return 0

    from .app import CortexApp

    app = CortexApp()

    initial: str | None = None
    if args:
        sub = args[0]
        if sub == "update":
            initial = "update"
        elif sub == "browse":
            initial = "browse"
        elif sub == "create":
            initial = "create"

    # Override on_mount if a subcommand was given.
    # If config doesn't exist yet, skip the subcommand and run setup first
    # (the user can run the subcommand again after setup completes).
    if initial and app.cfg is not None:
        original_mount = app.on_mount

        def custom_mount() -> None:
            original_mount()
            app.push_screen(initial)

        app.on_mount = custom_mount  # type: ignore[method-assign]

    app.run()
    return 0


if __name__ == "__main__":
    sys.exit(main())
