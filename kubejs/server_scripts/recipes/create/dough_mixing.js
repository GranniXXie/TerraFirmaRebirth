// ============ 面团 / 蓝冰：Create 搅拌流体化 ============
// 背景：Create 6.0 工作盆保留了"自动执行原版型合成配方"的回退逻辑，
// TFC 的面团合成（面粉 + 木水桶）会被搅拌器当成普通合成执行 → 木水桶被整个吞掉。
// 这里提供真流体搅拌配方：管道泵水/酵种液进盆即可自动化，全程不接触桶。
ServerEvents.recipes(event => {
    const grains = ['barley', 'maize', 'oat', 'rice', 'rye', 'wheat']

    // TFC 粗面团：面粉 + 100mb 水 → 1 面团（恢复 3.4.2 时期的自动化，玩家点名要求）
    grains.forEach(g => {
        event.recipes.create.mixing(
            `tfc:food/${g}_dough`,
            [`tfc:food/${g}_flour`, Fluid.of('minecraft:water', 100)]
        ).id(`kubejs:mixing/dough/${g}`)
    })

    // firmalife 面包面团：面粉 + 100mb 酵种液 + 甜味剂 → 2 面团
    //（手工版 4 个，自动化减半防止纯挂机白嫖，与手工作坊保持差价）
    grains.forEach(g => {
        event.recipes.create.mixing(
            Item.of(`firmalife:food/${g}_dough`, 2),
            [`tfc:food/${g}_flour`, Fluid.of('firmalife:yeast_starter', 100), '#tfc:foods/sweeteners']
        ).id(`kubejs:mixing/bread_dough/${g}`)
    })

    // 蓝冰链起点：4 雪块 + 1000mb 水（不加热）→ 4 冰
    // 之后走原版 9合1：冰 → 浮冰 → 蓝冰（魂火灯材料）
    // 雪球总消耗从 2916 降到 324，仍然是体力活但不再离谱
    event.recipes.create.mixing(
        Item.of('minecraft:ice', 4),
        ['4x minecraft:snow_block', Fluid.of('minecraft:water', 1000)]
    ).id('kubejs:mixing/ice_from_snow')
})
