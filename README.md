# Kaden's Games

Blocky, ad-free games for the browser. The home page lets you pick one:

- **Kaden's Kosy Hotel** (`hotel.html`): check guests in, clean rooms, refill the toilets, build out the hotel, then open the Beach Hotel and Snow Lodge.
- **Kaden Mart** (`mart.html`): serve customers at the tills, fill the shelves from the stockroom, push trolleys back from the car park and grow the supermarket.
- **Kaden's Kutz** (`barber.html`): a blocky barber shop. Snip, buzz, grow and paint six people's hair, add hats and take photos.
- **Kaden's Kool Kones** (`icecream.html`): drive an ice cream van to the park, beach, football pitch, funfair and snowy hill, and copy the picture orders to serve the queue.

Play: https://apexnugget.github.io/kadens-kosy-hotel/

On an iPad: open the link in Safari, tap Share → Add to Home Screen.

Built with [three.js](https://threejs.org) r128 (MIT, see THREE-LICENSE.txt). Progress is saved in the browser on the device.

## Saves, backups and offline play

- Progress is saved in the browser on the device. Every save key starts with `kaden`.
- The **💾 Backup** button on the home page saves a backup file (or a copy-and-paste code) and restores it, for example onto a new iPad.
- After one visit with internet, all the games work offline (`sw.js` keeps a copy). Pages still update whenever there's internet.

## How the code is organised

```
src/
  index.html, hotel.html, mart.html, barber.html, icecream.html   <- edit these
  engine/                                                         <- shared pieces
    three.js  tex.js  person.js  labels.js  sound.js  keep.js  hud.css  ...
build.py        stitches each src/ page together with the engine pieces it uses
tests/smoke.py  plays a little of every game, checks backups and offline play
sw.js           the offline helper
```

The pages in the repo root are **built**: don't edit them by hand. Change `src/`, then:

```
python3 build.py        # rebuild every game
python3 tests/smoke.py  # check nothing broke (needs: pip install playwright && playwright install chromium)
```

Wherever a page in `src/` says `@@person@@`, `build.py` pastes in `src/engine/person.js`, so fixing a piece in the engine fixes it in every game that uses it. Each page sets a small `ENV` (ground colour, sky, fog) that the shared engine pieces read.
