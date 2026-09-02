// 铁轨卷筒：iron_rail_component 标签只有原版铁活版门（配方已删、不可得），
// 把群峦锻铁活版门加进标签，玩家打出来的活版门才能被识别
ServerEvents.tags('item', event => {
    event.add('electroenergetics:iron_rail_component', 'tfc:metal/trapdoor/wrought_iron')
})

ServerEvents.recipes(event => {

    // EE 配方材料替换：让电工时代真正可玩
    // 绝缘材料：原版干海带在本包无法获得，沿用 Create 配方的处理方式换成橡胶
    event.replaceInput({mod: 'electroenergetics'}, 'minecraft:dried_kelp', 'afc:rubber_bar')

    // 交流发电机电刷：铁栏杆配方已删，换成群峦锻铁棒（沉浸铁杆本包无法制作）
    event.replaceInput({mod: 'electroenergetics'}, 'minecraft:iron_bars', 'tfc:metal/rod/wrought_iron')

    // 电阻器/电位器：原版煤无法获得，换成石墨粉（碳膜电阻的正经材料）
    event.replaceInput({mod: 'electroenergetics'}, 'minecraft:coal', 'tfc:powder/graphite')

    // 线路阻尼器：链条配方已删，换成群峦锻铁棒
    event.replaceInput({mod: 'electroenergetics'}, '#c:chains', 'tfc:metal/rod/wrought_iron')

    // 植物油统一：工作盆压实种子改产沉浸植物油（原产出电力学自家 plant_oil，同名不同物造成割裂）。
    // 产量 100mB 维持 EE 原数值；变压器油/生物柴油本就走 #c:plantoil 标签，存量 EE 油可自然消化
    event.remove({ id: 'electroenergetics:compacting/plant_oil' })
    event.custom({
        "type": "create:compacting",
        "ingredients": [{ "tag": "c:seeds" }],
        "results": [{ "amount": 100, "id": "immersiveengineering:plantoil" }]
    }).id('electroenergetics:compacting/plant_oil')

    // 频率表：上游 CEE 1.1.1 就没给它写合成配方（物品注册完整、生存做不出来），这里补上。
    // 对齐能量表的成本结构：双连接器×2 + 电压表 + 精密构件 + 铁板，
    // 把能量表的电流表换成时钟——电压表测电势、时钟测周期，合起来就是频率计。
    event.custom({
        "type": "minecraft:crafting_shaped",
        "category": "misc",
        "pattern": ["C C", "vPc", " s "],
        "key": {
            "C": { "item": "electroenergetics:double_connector" },
            "P": { "item": "create:precision_mechanism" },
            "v": { "item": "electroenergetics:voltmeter" },
            "c": { "item": "minecraft:clock" },
            "s": { "tag": "c:plates/iron" }
        },
        "result": { "count": 1, "id": "electroenergetics:frequency_meter" }
    }).id('electroenergetics:crafting/frequency_meter')
})
