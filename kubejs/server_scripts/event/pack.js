BlockEvents.rightClicked(event => {
    const {block, item, hand, player} = event
    
    /**
     * 
     * @param {string} id 
     * @returns 
     */
    function packBlock(id) {
        if(hand.name() != 'MAIN_HAND') return
        if(block.id != id) return
        if(item.hasTag('minecraft:shovels') || item.hasTag('tfcsuperhammer:supershovels')) {
            block.set('air')
            player.give(id)
            // 1.21.1 签名：hurtAndBreak(int, LivingEntity, EquipmentSlot)，第三参不再是 Consumer
            let EquipmentSlot = Java.loadClass('net.minecraft.world.entity.EquipmentSlot')
            item.hurtAndBreak(10, player, EquipmentSlot.MAINHAND)
            event.success()
            event.cancel()
        }
    }

    packBlock("tfc:firepit")
    packBlock("tfc:pot")
})