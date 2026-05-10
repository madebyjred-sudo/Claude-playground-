"""ASCII headers and decorations used across the app."""

LOGO = r"""
     ___/\/\/\/\/\____/\/\/\/\____/\/\/\/\/\____/\/\/\/\/\/\__/\/\/\/\/\/\__/\/\____/\/\_
    _/\/\__________/\/\____/\/\__/\/\____/\/\______/\/\______/\______________/\/\/\/\___
   _/\/\__________/\/\____/\/\__/\/\/\/\/\________/\/\______/\/\/\/\/\________/\/\_____
  _/\/\__________/\/\____/\/\__/\/\__/\/\________/\/\______/\/\____________/\/\/\/\___
 ___/\/\/\/\/\____/\/\/\/\____/\/\____/\/\______/\/\______/\/\/\/\/\/\__/\/\____/\/\_
____________________________________________________________________________________
"""

LOGO_EN = LOGO

BOX_HORIZONTAL = "─"
BOX_VERTICAL = "│"
BOX_TOP_LEFT = "╭"
BOX_TOP_RIGHT = "╮"
BOX_BOTTOM_LEFT = "╰"
BOX_BOTTOM_RIGHT = "╯"
BOX_DOUBLE_TOP_LEFT = "╔"
BOX_DOUBLE_TOP_RIGHT = "╗"
BOX_DOUBLE_BOTTOM_LEFT = "╚"
BOX_DOUBLE_BOTTOM_RIGHT = "╝"
BOX_DOUBLE_HORIZONTAL = "═"
BOX_DOUBLE_VERTICAL = "║"
DIVIDER = "─" * 60


def horizontal_rule(width: int = 60) -> str:
    return BOX_HORIZONTAL * width


def banner(text: str, width: int = 60) -> str:
    pad_w = width - 4 - len(text)
    if pad_w < 0:
        return text
    line_top = BOX_DOUBLE_TOP_LEFT + BOX_DOUBLE_HORIZONTAL * (width - 2) + BOX_DOUBLE_TOP_RIGHT
    line_mid = BOX_DOUBLE_VERTICAL + "  " + text + " " * pad_w + BOX_DOUBLE_VERTICAL
    line_bot = BOX_DOUBLE_BOTTOM_LEFT + BOX_DOUBLE_HORIZONTAL * (width - 2) + BOX_DOUBLE_BOTTOM_RIGHT
    return "\n".join([line_top, line_mid, line_bot])


def get_logo(language: str = "es") -> str:
    return LOGO_EN if language == "en" else LOGO
