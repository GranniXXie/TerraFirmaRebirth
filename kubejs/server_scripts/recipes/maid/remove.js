ServerEvents.recipes(event => {
    const ids = [
        'touhou_little_maid:altar/spawn_box',
        'touhou_little_maid:altar/craft_tank_backpack',
        'touhou_little_maid:altar/craft_ender_chest_backpack',
        'touhou_little_maid:altar/craft_furnace_backpack',
        
        "maid_storage_manager:portable_craft_calculator_bauble"
    ]

    ids.forEach(id => {
        event.remove({id: id})
    })
})