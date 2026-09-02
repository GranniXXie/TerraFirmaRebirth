# TerraFirma Rebirth (TFCR)

A hardcore, progression-driven **TerraFirmaCraft** total-conversion modpack for
**Minecraft 1.21.1 · NeoForge**, extended all the way from the stone age to
**aeronautics and a crewed Moon landing**.

This repository contains the **development layer** of the pack — everything we
actually write and maintain by hand:

| Path | What it is |
|---|---|
| `kubejs/` | All KubeJS scripts: recipe overhauls, TFC/Create/Aeronautics integration, worldgen tweaks, item/block additions, EMI tweaks |
| `kubejs/assets` + `kubejs/data` | Quest-book translations (zh_cn / en_us / ru_ru / ...), custom textures, datapack content |
| `config/` | Mod configuration tuned for the pack (FTB Quests book lives in `config/ftbquests/quests/`) |
| `global_packs/` | Required resource/data packs shipped with the instance |
| `manifest.json` / `modlist.html` | The full mod list (CurseForge format) |

> ⚠️ **No mod jars are stored in this repo.** See
> [Setting up a dev instance](#setting-up-a-dev-instance).

## Setting up a dev instance

1. Install **Prism Launcher** (or CurseForge App).
2. Download the latest release of the pack from CurseForge and import it,
   **or** create a blank 1.21.1 NeoForge instance and let the launcher resolve
   `manifest.json`.
3. Clone this repo and copy everything into the instance's `.minecraft/`
   folder, overwriting when asked:

   ```bash
   git clone https://github.com/GranniXXie/TerraFirmaRebirth.git
   # copy the *contents* of the repo into the instance root
   ```

4. Grab the extra jars listed in [`local-mods/README.md`](local-mods/README.md)
   and drop them into `mods/`.
5. Launch. `kubejs` errors are reported in-game and in
   `logs/kubejs/`.

## Contributing

We welcome contributions — recipes, quest text (any language), translations,
balance feedback, and bug reports. Please read
[CONTRIBUTING.md](CONTRIBUTING.md) first.

- **Bug reports / suggestions:** open a GitHub Issue, or find us on Discord.
- **Pull requests:** please test in a dev instance before submitting.
  KubeJS startup errors are not acceptable in a PR.

## Custom mods developed for this pack

| Mod | Repository |
|---|---|
| tfcr-fixes (bugfix mixin mod) | https://github.com/GranniXXie/tfcr-fixes |
| woodencog TFCR fork (TFC × Create compat) | https://github.com/GranniXXie/woodencog-TFCR |
| electroenergetics TFCR build | https://github.com/GranniXXie/electroenergetics-TFCR |
| TFCBetterBlastFurnace TFCR build | https://github.com/GranniXXie/tfcbetterbf-TFCR |
| kaleidoscopetfctavern TFCR port | https://github.com/GranniXXie/kaleidoscopetfctavern-TFCR |
| Firmalife TFCR build | https://github.com/GranniXXie/firmalife-TFCR |
| tfc-ability-fix | https://github.com/GranniXXie/tfc-ability-fix |
| cosmo-return-clamp | https://github.com/GranniXXie/cosmo-return-clamp |

Each repository has a GitHub Release with the ready-to-use jar.

## License

All original scripts, configs, quest text and assets **in this repository**
are the work of the TFCR team and contributors. Individual mods keep their
own licenses — check their respective pages.
