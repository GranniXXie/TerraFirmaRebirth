# Extra mod jars (not in the CurseForge manifest)

These 12 jars ship inside the CurseForge release package (`overrides/mods/`)
but are **not** resolvable from `manifest.json`, so a dev instance needs them
dropped into `mods/` manually.

The easiest source is always the latest release zip from our CurseForge page —
just copy its `overrides/mods/` folder. Individual sources:

| Jar | Where to get it |
|---|---|
| `tfcr-fixes-*.jar` | https://github.com/GranniXXie/tfcr-fixes/releases |
| `woodencog-*-TFCR.jar` | https://github.com/GranniXXie/woodencog-TFCR/releases |
| `tracks_plus-*.jar` | CurseForge: https://www.curseforge.com/minecraft/mc-mods/create-track |
| `friendship-*.jar` | Modrinth: https://modrinth.com/mod/friendship-breezeth |
| `electroenergetics-*-TFCR.jar` | TFCR patched build — bundled in the CF release; ask on Discord |
| `TFCBetterBlastFurnace-TFCR-*.jar` | TFCR patched build — bundled in the CF release; ask on Discord |
| `kaleidoscopetfctavern-*.jar` | Bundled in the CF release; ask on Discord |
| `Opticores-*.jar` | Bundled in the CF release; ask on Discord |
| `sable_fix_mod-*.jar` | Bundled in the CF release; ask on Discord |
| `sablecollisiondamage-*.jar` | Bundled in the CF release; ask on Discord |
| `sableexplosionfix-*.jar` | Bundled in the CF release; ask on Discord |
| `tfc-ability-fix-*.jar` | Bundled in the CF release; ask on Discord |

> Do not commit jars to this repository.
