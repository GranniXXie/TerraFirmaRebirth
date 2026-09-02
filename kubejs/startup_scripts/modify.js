Platform.getInfo('kubejs').name = 'TerraFirma:Rebirth'
// Platform.getInfo('tfcr').name = 'TerraFirma:Rebirth'

ItemEvents.modification(event => {
    event.modify("minecraft:netherite_helmet", c => {
        c.setMaxDamage(1463)
    })

    event.modify("minecraft:netherite_chestplate", c => {
        c.setMaxDamage(2098)
    })

    event.modify("minecraft:netherite_leggings", c => {
        c.setMaxDamage(1980)
    })

    event.modify("minecraft:netherite_boots", c => {
        c.setMaxDamage(1744)
    })
})
