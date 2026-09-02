BlockEvents.rightClicked(event => {
    const {player, item, block} = event
    if(!player.isCreative()) return

    // TFC.misc methods removed in KubeJSTFC 1.21
    // Food traits are handled natively by TFC
    
    if(block.id == "minecraft:obsidian") {
        let tag = item.getOrCreateTag()
        tag.putBoolean('rottenfood', false)
        item.setNbt(tag)
        event.success()
    }
    
    if(block.id == "minecraft:crying_obsidian") {
        let tag = item.getOrCreateTag()
        tag.putBoolean('rottenfood', true)
        item.setNbt(tag)
        event.success()
    }

    // TFC.misc.applyFoodTrait no longer exists
    if(block.id == "firmalife:drying_mat") {
        // Drying is handled natively by firmalife
        event.success()
    }
})
