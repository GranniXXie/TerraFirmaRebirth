# Contributing to TerraFirma Rebirth

Thanks for your interest! Here's how to help.

## What you can contribute

- **Quest book** (`config/ftbquests/quests/`): text improvements, new
  translations (`lang/*.snbt`), better icons, clearer descriptions.
- **KubeJS scripts** (`kubejs/server_scripts`, `startup_scripts`,
  `client_scripts`): recipes, compat fixes, balance tweaks.
- **Translations**: the pack ships zh_cn, en_us and ru_ru. More languages
  are very welcome.
- **Bug reports**: logs, repro steps, and your pack version.

## Ground rules

1. **Never commit mod jars, saves, logs or the `ambience_music/` /
   `shaderpacks/` folders.** They are git-ignored on purpose.
2. This is a **TerraFirmaCraft** pack — vanilla items/recipes are replaced
   by TFC equivalents on purpose. Before "fixing" a recipe, check whether
   the vanilla version was removed deliberately.
3. Test before you PR: the game must boot with **zero KubeJS errors**.
4. Keep quest text style consistent: short, practical, with a bit of flavor.
   All four languages should be updated together when possible
   (`zh_cn`, `en_us`, `ru_ru`, plus the base lang file).
5. Large balance changes (ore rates, progression gates) — open an Issue
   first so we can discuss.

## Dev tips

- KubeJS logs: `logs/kubejs/startup.log`, `server.log`, `client.log`.
- Reload scripts in-game: `/kubejs reload server_scripts` etc.
- Quest book editing: open the quest GUI in-game and edit directly, then
  commit the changed `.snbt` files.
- Recipe IDs follow `tfcr:<path>` for pack-added content.
