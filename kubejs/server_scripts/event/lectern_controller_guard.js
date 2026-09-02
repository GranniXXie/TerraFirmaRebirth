// 遥控器 × 群峦讲台 交互拦截
// 背景：Create 的无线红石遥控器放上原版讲台时会把讲台转成 create:lectern_controller 来遥控，
// 但它的判定写死了 Blocks.LECTERN，群峦讲台（tfc:wood/lectern/*，虽继承原版讲台）不匹配，
// 结果遥控器被当成"书"夹进讲台，右击只会打开一个秒退的空 GUI，无法遥控。
// 功能级修复需要 Mixin 且会把群峦讲台吞成原版讲台（progression 事故），不做；
// 这里拦截这次注定失败的交互，给出明确提示，避免玩家误以为遥控器坏了。
BlockEvents.rightClicked(event => {
    const { block, item, player } = event
    if (!block) return
    if (!block.id.startsWith('tfc:wood/lectern/')) return

    // 讲台里已经夹着遥控器（本修复实装前放进去的）：任何右击都只会弹秒退的假书 GUI，
    // 拦截并指引玩家挖掉讲台取回（讲台被破坏时会掉落其中物品）
    let bookId = null
    try {
        const data = block.entityData
        if (data && data.Book) bookId = String(data.Book.id || '')
    } catch (e) { /* 读不到实体数据就当没有 */ }

    if (bookId === 'create:linked_controller') {
        player.tell(Text.yellow('这台讲台里夹着无线红石遥控器，它无法这样使用。'))
        player.tell(Text.gray('把讲台挖掉即可取回遥控器；遥控器可以固定在原版讲台上遥控，手持也能直接操控。'))
        event.cancel()
        return
    }

    // 手持遥控器右击讲台：会被当书夹进去，直接拦下说明
    if (item && item.id === 'create:linked_controller') {
        player.tell(Text.yellow('无线红石遥控器无法固定在群峦讲台上。'))
        player.tell(Text.gray('遥控器可以固定在原版讲台上遥控，手持也能直接操控。'))
        event.cancel()
    }
})
