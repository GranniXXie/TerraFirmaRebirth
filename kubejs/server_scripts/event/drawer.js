BlockEvents.rightClicked(event => {
    const {block, item, hand, player} = event
    if(hand.name() != 'MAIN_HAND') return
    if(player.isShiftKeyDown()) return
    if(item.isEmpty() && block.hasTag('functionalstorage:drawer')) {
        let drawer = block.getEntity()
        if(drawer instanceof $DrawerTile) {
            if(drawer.getHandler().getStackInSlot(0).isEmpty()) {
                event.cancel()
            }
        }
    }
})