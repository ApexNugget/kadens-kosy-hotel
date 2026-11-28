#!/usr/bin/env python3
"""Smoke tests for Kaden's Games.

Serves the repo on localhost, opens every game in headless Chromium and plays
a little of each, failing on any page error. Also checks the backup/restore on
the home page and that the games still open with the network switched off.

    pip install playwright && playwright install chromium
    python3 tests/smoke.py
"""
import http.server
import pathlib
import subprocess
import sys
import threading

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
PORT = 8765
URL = f'http://localhost:{PORT}/'
failures = []


def check(ok, what):
    print(('  ok   ' if ok else '  FAIL ') + what)
    if not ok:
        failures.append(what)


def serve():
    handler = lambda *a: http.server.SimpleHTTPRequestHandler(*a, directory=str(ROOT))
    http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
    srv = http.server.ThreadingHTTPServer(('localhost', PORT), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def page_with_errors(ctx):
    pg = ctx.new_page()
    pg.errors = []
    pg.on('pageerror', lambda e: pg.errors.append(str(e)))
    return pg


def play_hotel(pg):
    pg.goto(URL + 'hotel.html'); pg.wait_for_timeout(1500)
    pg.click('#go', force=True)
    for key in ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']:
        pg.keyboard.down(key); pg.wait_for_timeout(600); pg.keyboard.up(key)
    pg.click('#mgr', force=True); pg.wait_for_timeout(300)
    check(not pg.query_selector('#menu').is_hidden(), 'hotel: Manager menu opens')
    pg.click('#mclose', force=True)


def play_mart(pg):
    pg.goto(URL + 'mart.html'); pg.wait_for_timeout(1500)
    pg.click('#go', force=True)
    for key in ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']:
        pg.keyboard.down(key); pg.wait_for_timeout(600); pg.keyboard.up(key)
    check('$' in pg.inner_text('#cash'), 'mart: cash shows')


def play_barber(pg):
    pg.goto(URL + 'barber.html'); pg.wait_for_timeout(1500)
    pg.click('[data-p=mace]'); pg.wait_for_timeout(800)
    box = pg.query_selector('#stage canvas').bounding_box()
    x, y = box['width'] * .45, box['height'] * .3
    pg.mouse.move(x, y); pg.mouse.down(); pg.mouse.move(x + 80, y + 60, steps=15); pg.mouse.up()
    pg.click('[data-t=hat]'); pg.click('[data-h=crown]'); pg.wait_for_timeout(300)
    check(pg.inner_text('#who') == 'Mace Man', 'barber: Mace Man in the chair')


def play_icecream(pg):
    pg.goto(URL + 'icecream.html'); pg.wait_for_timeout(1500)
    pg.click('[data-l=park]')
    pg.wait_for_function("!document.getElementById('counter').hidden", timeout=20000)
    served = 0
    for _ in range(120):
        pg.wait_for_timeout(200)
        pg.evaluate("()=>{const g=document.querySelector('#counter .cb.glow');if(g)g.click()}")
        served = int(pg.inner_text('#servedp').split()[-1])
        if served >= 1:
            break
    check(served >= 1, 'icecream: served a customer by following the glowing buttons')


def play_kraft(pg):
    pg.goto(URL + 'kraft.html'); pg.wait_for_timeout(2500)
    pg.click('#go')
    pg.keyboard.down('w'); pg.wait_for_timeout(800); pg.keyboard.up('w')
    pg.mouse.click(512, 520); pg.wait_for_timeout(300)
    pg.click('#magic'); pg.click('#blist [data-i="0"]'); pg.wait_for_timeout(300)
    check(not pg.query_selector('#quiz').is_hidden(), 'kraft: magic build asks a question')
    pg.evaluate("()=>{const b=[...document.querySelectorAll('#qans button')];b.forEach(x=>x.click())}"); pg.wait_for_timeout(3000)
    check(pg.query_selector('#quiz').is_hidden(), 'kraft: answering starts the build')


def main():
    r = subprocess.run([sys.executable, str(ROOT / 'build.py'), '--check'], capture_output=True, text=True)
    check(r.returncode == 0, 'built pages match src/ (python3 build.py --check)')
    srv = serve()
    with sync_playwright() as p:
        browser = p.chromium.launch(args=['--use-gl=swiftshader', '--ignore-gpu-blocklist'])
        ctx = browser.new_context(viewport={'width': 1024, 'height': 768})
        for name, play in [('hotel', play_hotel), ('mart', play_mart), ('barber', play_barber), ('icecream', play_icecream), ('kraft', play_kraft)]:
            pg = page_with_errors(ctx)
            try:
                play(pg)
            except Exception as e:
                pg.errors.append(f'{type(e).__name__}: {e}')
            check(not pg.errors, f'{name}: no errors' + (f' ({pg.errors[0][:120]})' if pg.errors else ''))
            pg.close()

        # backup round trip on the home page
        pg = page_with_errors(ctx)
        pg.goto(URL); pg.wait_for_timeout(800)
        pg.click('#bk'); pg.click('#bcopy'); pg.wait_for_timeout(300)
        code = pg.input_value('#bcode')
        pg.evaluate("()=>{localStorage.setItem('kadenMart1','{\"served\":999}')}")
        pg.fill('#bcode', code); pg.click('#bpaste'); pg.wait_for_timeout(200)
        check(not pg.query_selector('#bok').is_hidden(), 'home: backup code is recognised')
        pg.click('#bok'); pg.wait_for_timeout(1500)
        check(pg.evaluate("()=>localStorage.getItem('kadenMart1')") != '{"served":999}', 'home: restore puts the backup back')
        check(not pg.errors, 'home: no errors')

        # offline: once the helper has saved everything, every game still opens with no network
        pg.evaluate("()=>navigator.serviceWorker.ready")
        pg.reload(); pg.wait_for_timeout(1500)
        ctx.set_offline(True)
        for page in ['', 'hotel.html', 'mart.html', 'barber.html', 'icecream.html', 'kraft.html']:
            try:
                pg.goto(URL + page); pg.wait_for_timeout(1200)
                ok = pg.evaluate("()=>typeof THREE!=='undefined'||location.pathname.endsWith('/')")
            except Exception:
                ok = False
            check(ok, f'offline: {page or "home page"} opens')
        ctx.set_offline(False)
        browser.close()
    srv.shutdown()
    print('\n' + ('All good! ✅' if not failures else f'{len(failures)} problem(s) ❌'))
    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    main()
