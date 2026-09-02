ServerEvents.tags('block', event => {
    event.add('kubejs:cranks', [
        "create:hand_crank",
        "create_connected:crank_wheel",
        "create_connected:large_crank_wheel"
    ])

    event.add('afc:tappable_logs', [
        "tfc:wood/log/kapok",
        "tfc:wood/log/palm"
    ])

    event.add('farmerstfc:magma_block', [
        "tfc:rock/magma/granite",
        "tfc:rock/magma/diorite",
        "tfc:rock/magma/gabbro",
        "tfc:rock/magma/basalt",
        "tfc:rock/magma/andesite",
        "tfc:rock/magma/dacite"
    ])

    event.add('ktfcc:heat_source', [
        "tfc:rock/magma/granite",
        "tfc:rock/magma/diorite",
        "tfc:rock/magma/gabbro",
        "tfc:rock/magma/basalt",
        "tfc:rock/magma/andesite",
        "tfc:rock/magma/dacite"
    ])

    // AE2 tag已移除
    // event.add('ae2:growth_acceleratable', "tfc_ie_addon:mineral/budding_quartz")

    event.add('functionalstorage:drawer', /functionalstorage:tfc_/)

    // 让机械动力动态结构（轴承/活塞/列车等）识别 TFC/AFC 木箱为挂载存储
    // 注意：必须用 chest_mounted_storage（原版箱子同款类型），不能用 simple_mounted_storage！
    // simple 类型在装配时复制方块的物品能力快照，而 TFC 大箱子在每一半暴露的是合并后的
    // 36 格能力，两半各存一份整箱快照，拆卸时旧半后写盖掉新半 → 刷物品 dupe（4.1.23 官服实锤）。
    // chest 类型则每半各存自己的 18 格，双箱菜单由 Create 正确组合，写回各写各的半箱。
    const tfcChests = ['acacia', 'ash', 'aspen', 'birch', 'blackwood', 'chestnut', 'douglas_fir',
        'hickory', 'kapok', 'mangrove', 'maple', 'oak', 'palm', 'pine', 'rosewood', 'sequoia',
        'spruce', 'sycamore', 'white_cedar', 'willow']
        .flatMap(w => [`tfc:wood/chest/${w}`, `tfc:wood/trapped_chest/${w}`])
    const afcChests = ['araucaria', 'baobab', 'beech', 'cypress', 'eucalyptus', 'fig', 'ginkgo',
        'hevea', 'ipe', 'ironwood', 'mahoe', 'mahogany', 'teak', 'tualang']
        .flatMap(w => [`afc:wood/chest/${w}`, `afc:wood/trapped_chest/${w}`])
    event.add('create:chest_mounted_storage', tfcChests.concat(afcChests))

    // Beneath 下界原木标签修复：模组自身的 warped_logs 标签写成了绯红内容（复制粘贴 bug），
    // 导致诡异原木完全不在 #minecraft:logs 里，群峦斧子无法识别砍伐；矿斧标签也只登记了家具没登记原木。
    const netherLogs = ['crimson', 'warped']
        .flatMap(w => [`beneath:wood/log/${w}`, `beneath:wood/wood/${w}`,
            `beneath:wood/stripped_log/${w}`, `beneath:wood/stripped_wood/${w}`])
    event.add('minecraft:logs', netherLogs)
    event.add('minecraft:mineable/axe', netherLogs)
    event.add('beneath:warped_logs', [
        'beneath:wood/log/warped', 'beneath:wood/wood/warped',
        'beneath:wood/stripped_log/warped', 'beneath:wood/stripped_wood/warped'
    ])

    // IE 多方块（电弧炉/精炼厂/粉碎机等成型机器）禁止进入机械动力动态结构：
    // IE 整机靠自家动态模型 + 方块实体渲染器渲染，Create 的虚拟世界不认这套系统，
    // 上矿车/轴承后整机渲染崩坏"消失"（Create 官方 issue #2150，2021 年至今未修），
    // 历史上还有 ghost block 与 dupe 前科。加入 create:non_movable 后装配会被拒绝，
    // 机器完好留在原地，杜绝财产损失。用反射遍历注册表，自动覆盖 IE 全部多方块部件。
    let IEMultiblockPart = Java.tryLoadClass('blusunrize.immersiveengineering.api.multiblocks.blocks.registry.MultiblockPartBlock')
    if (IEMultiblockPart == null) {
        console.warn('[TFCR] IE MultiblockPartBlock class not found, non_movable guard skipped')
    }
    if (IEMultiblockPart != null) {
        var IEBuiltInBlocks = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries').BLOCK
        var ieMultiblockBlocks = []
        IEBuiltInBlocks.forEach(block => {
            if (block instanceof IEMultiblockPart) {
                ieMultiblockBlocks.push(String(IEBuiltInBlocks.getKey(block)))
            }
        })
        if (ieMultiblockBlocks.length > 0) {
            event.add('create:non_movable', ieMultiblockBlocks)
            console.log('[TFCR] IE multiblock parts marked non_movable: ' + ieMultiblockBlocks.length + ' blocks')
        }
    }
})
