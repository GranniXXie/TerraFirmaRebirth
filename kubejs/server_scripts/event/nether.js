BlockEvents.rightClicked('minecraft:obsidian', event => {
    const player = event.player; // 获取玩家对象
    const mainHandItem = player.mainHandItem; // 主手物品
    const offHandItem = player.offHandItem; // 副手物品

    // 定义需要检测的物品和标签
    const specificItems = ['tfc:firestarter']; // 特定物品
    const specificTags = ['c:tools/igniter']; // 特定标签（1.21：点火工具统一用 c:tools/igniter）

    /**
     * 检查物品是否匹配
     * @param {Internal.ItemStack} item 
     * @returns 
     */
    function isProhibitedItem(item) {
        if (item.isEmpty()) return false; // 如果物品为空，直接返回 false
        if (specificItems.includes(item.id)) return true; // 检查是否是特定物品
        for (const tag of specificTags) {
            if (item.hasTag(tag)) return true; // 检查是否带有特定标签
        }
        return false; // 如果都不匹配，返回 false
    }

    // 检查主手或副手是否持有被禁止的物品
    if (isProhibitedItem(mainHandItem) || isProhibitedItem(offHandItem)) {
        player.setStatusMessage(Text.of('无法使用此物品右键黑曜石！ You cannot use this on obsidian!').red());
        event.cancel(); // 取消事件
    }
});
BlockEvents.placed('minecraft:obsidian', event => {

    /**
     * 
     * @param {Internal.BlockContainerJS_} block 
     * @returns 
     */
    function is3obs(block) {
        //检测竖直是否会形成3个相邻的黑曜石
        if(block.up.id=="minecraft:obsidian" && block.up.up.id=="minecraft:obsidian") return true;
        else if(block.up.id=="minecraft:obsidian" && block.down.id=="minecraft:obsidian") return true;
        else if(block.down.id=="minecraft:obsidian" && block.down.down.id=="minecraft:obsidian") return true
        else return false;
    }
    const block = event.block
    if(is3obs(block))
    event.cancel();
});