# Happy Wheels iOS levels

Pulled from Happy Wheels iOS 1.1.5, plus community levels from
[happywheelsios.weebly.com](https://happywheelsios.weebly.com/levels.html) and
[happywheelsioslevels.weebly.com](https://happywheelsioslevels.weebly.com/levels.html).

## What's in here

```
index.html              GitHub Pages download site
downloads/              zip packs
pc_converted/           official campaign LevelXML (from the IPA)
user_created_levels/    community levels converted for PC
extras/                 unfinished Pogo DEV + Dad boss + HD variants
catalog.json            campaign chapter index
```

Enable GitHub Pages on this repo (root `/`) to use the download page.

### pc_converted/

Official mobile campaign after a small cleanup:

- 15 each for Business Guy, Irresponsible Dad, Wheelchair Guy, Effective Shopper
- 4 obstacle courses

### user_created_levels/

User levels from the old Weebly share site. Originals were `.happywheels` plists (or zip/rar of those). Converted to normal PC-scale LevelXML. See `catalog.json` in that folder for titles.

### extras/

- unused Dad boss level
- HD variants of swamp / gears / shopper city
- unfinished Pogo Stick Guy DEV levels

## Conversion

**Campaign (IPA):** already LevelXML. Stripped mobile-only `<info>` attrs: `ptm`, `sw`, `sh`, `r`, `cw`.

**User-created (Weebly):** unwrapped plist `data`, removed `fm="m"`, `0`/`1` → `f`/`t`, coordinates/sizes ×40 for PC editor scale.

## Source

Happy Wheels iOS 1.1.5 (build 0.9064) + community uploads from the two Weebly sites above. Not affiliated with Fancy Force / Totaljerkface.
