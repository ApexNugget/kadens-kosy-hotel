#!/usr/bin/env python3
"""Build the games.

Each game is written as a template in src/<game>.html. Wherever a template says
@@name@@, the shared engine piece src/engine/name.js (or name.css) is pasted in.
The result is one self-contained page per game in the repo root, which is what
GitHub Pages serves and what works offline.

    python3 build.py          build every game
    python3 build.py --check  fail if a built page is out of date (used by the tests)

Fix something in src/engine once, run the build, and every game gets the fix.
Never edit hotel.html, mart.html, barber.html or icecream.html directly:
edit src/ and rebuild.
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / 'src'
ENGINE = SRC / 'engine'
STAMP = '<!-- Built from src/{name} by build.py: edit the source, not this file. -->\n'


def piece(name):
    for ext in ('.js', '.css'):
        p = ENGINE / (name + ext)
        if p.exists():
            return p.read_text().rstrip('\n')
    raise SystemExit(f'build.py: no engine piece called "{name}" in src/engine')


def build(template):
    text = template.read_text()
    out = re.sub(r'@@(\w+)@@', lambda m: piece(m.group(1)), text)
    # keep the doctype first so browsers stay in standards mode
    first, rest = out.split('\n', 1)
    return first + '\n' + STAMP.format(name=template.name) + rest


def main():
    check = '--check' in sys.argv
    stale = []
    for template in sorted(SRC.glob('*.html')):
        target = ROOT / template.name
        html = build(template)
        if check:
            if not target.exists() or target.read_text() != html:
                stale.append(target.name)
        else:
            target.write_text(html)
            print(f'built {target.name} ({len(html) // 1024} KB)')
    if check:
        if stale:
            raise SystemExit('Out of date, run python3 build.py: ' + ', '.join(stale))
        print('All built pages are up to date.')


if __name__ == '__main__':
    main()
