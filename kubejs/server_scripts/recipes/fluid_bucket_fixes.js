// 流体桶群峦化修复：
// 包内流体一律用群峦木桶（tfc:wooden_bucket）装，原版铁桶装水/奶/岩浆不可得。
// 以下把模组配方里的原版流体桶替换为 TFC fluid_content 成分（JEI 显示为木桶装流体），
// 并删除原版铁桶的产出配方。TFC 高级合成类型保证流体被消耗后返还空木桶。
ServerEvents.recipes(event => {
    // 流体成分定义（tfc:fluid_content 匹配任何装有该流体的容器，即木桶）
    const water1000 = { type: 'tfc:fluid_content', fluid: { amount: 1000, fluid: 'minecraft:water' } }
    const water100 = { type: 'tfc:fluid_content', fluid: { amount: 100, fluid: 'minecraft:water' } }
    // 奶统一走 kubejs:milks 标签（牛奶/牦牛奶/山羊奶），终端消费配方不再只认原版奶
    const milk1000 = { type: 'tfc:fluid_content', fluid: { amount: 1000, tag: 'kubejs:milks' } }
    const milk250 = { type: 'tfc:fluid_content', fluid: { amount: 250, tag: 'kubejs:milks' } }

    // ===== 1. 删除原版铁桶的产出配方（铁桶不可得，水桶走 TFC 木料配方）=====
    event.remove({ id: 'create:pressing/bucket' }) // 双锻铁板压铁桶（与 ban 铁桶原则冲突）
    event.remove({ id: 'createdieselgenerators:compression_molding/bucket' }) // 铁板压模出铁桶

    // ===== 2. 风扇催化剂：删除"空催化剂+流体桶"配方 =====
    // 注液器（spout）灌流体才是本包正道：filling/fan_splashing_catalyst(水)、filling/fan_blasting_catalyst(岩浆)
    event.remove({ id: 'create_connected:item_application/splashing_catalyst_from_empty' })
    event.remove({ id: 'create_connected:item_application/blasting_catalyst_from_empty' })
    event.remove({ id: 'create_connected:item_application/freezing_catalyst_from_empty' }) // 前置模组未安装，本来也不加载

    // ===== 3. 4 个奶瓶合成原版牛奶桶——删除（奶用木桶/奶瓶，不需要铁桶）=====
    event.remove({ id: 'farmersdelight:milk_bucket_from_bottles' })

    // ===== 4. create 面团：面粉 + 一桶水(100mB) =====
    event.remove({ id: 'create:crafting/appliances/dough' })
    event.custom({
        type: 'tfc:advanced_shapeless_crafting',
        ingredients: [{ tag: 'c:flours/wheat' }, water100],
        primary_ingredient: water100,
        result: { count: 1, id: 'create:dough' }
    }).id('kubejs:crafting/dough')

    // ===== 5. 万花筒烹饪 8 个面团配方：N 面粉 + 水(100mB) → N 生面团 =====
    for (let n = 1; n <= 8; n++) {
        event.remove({ id: `minecraft:flour_from_${n}_wheat` })
        let ings = [water100]
        for (let i = 0; i < n; i++) ings.push({ item: 'kaleidoscope_cookery:flour' })
        event.custom({
            type: 'tfc:advanced_shapeless_crafting',
            ingredients: ings,
            primary_ingredient: water100,
            result: { count: n, id: 'kaleidoscope_cookery:raw_dough' }
        }).id(`kubejs:crafting/raw_dough_${n}`)
    }

    // ===== 6. 农夫乐事牛奶瓶：一桶奶(1000mB) + 4 玻璃瓶 → 4 奶瓶 =====
    event.remove({ id: 'farmersdelight:milk_bottle' })
    event.custom({
        type: 'tfc:advanced_shapeless_crafting',
        ingredients: [milk1000, { item: 'minecraft:glass_bottle' }, { item: 'minecraft:glass_bottle' }, { item: 'minecraft:glass_bottle' }, { item: 'minecraft:glass_bottle' }],
        primary_ingredient: milk1000,
        result: { count: 4, id: 'farmersdelight:milk_bottle' }
    }).id('kubejs:crafting/milk_bottle')

    // ===== 7. IE 红石酸：4 红石 + 一桶水(1000mB) =====
    // 原配方用 c:dusts/redstone 标签（本包为空），改用原版红石粉
    event.remove({ id: 'immersiveengineering:crafting/redstone_acid' })
    event.custom({
        type: 'tfc:advanced_shapeless_crafting',
        ingredients: [{ item: 'minecraft:redstone' }, { item: 'minecraft:redstone' }, { item: 'minecraft:redstone' }, { item: 'minecraft:redstone' }, water1000],
        primary_ingredient: water1000,
        result: { count: 1, id: 'immersiveengineering:redstone_acid_bucket' }
    }).id('kubejs:crafting/redstone_acid')

    // ===== 8. create 蛋糕：一桶奶(1000mB) + 糖 + 蛋 + 面团 =====
    event.remove({ id: 'create:crafting/curiosities/cake' })
    event.custom({
        type: 'tfc:advanced_shaped_crafting',
        pattern: [' M ', 'SES', ' P '],
        key: {
            M: milk1000,
            S: { item: 'minecraft:sugar' },
            E: { tag: 'c:eggs' },
            P: { tag: 'c:foods/dough' }
        },
        result: { count: 1, id: 'minecraft:cake' }
    }).id('kubejs:crafting/cake')

    // ===== 9. 农夫乐事烹饪锅 4 个奶类配方：c:drinks/milk 标签 → 奶(250mB) =====
    event.remove({ id: 'farmersdelight:cooking/hot_cocoa' })
    event.custom({
        type: 'farmersdelight:cooking',
        experience: 1.0,
        ingredients: [milk250, { item: 'minecraft:sugar' }, { item: 'minecraft:cocoa_beans' }, { item: 'minecraft:cocoa_beans' }],
        recipe_book_tab: 'drinks',
        result: { count: 1, id: 'farmersdelight:hot_cocoa' }
    }).id('kubejs:cooking/hot_cocoa')

    event.remove({ id: 'farmersdelight:cooking/pumpkin_soup' })
    event.custom({
        type: 'farmersdelight:cooking',
        experience: 1.0,
        ingredients: [{ item: 'farmersdelight:pumpkin_slice' }, { tag: 'c:foods/leafy_green' }, { tag: 'c:foods/raw_pork' }, milk250],
        recipe_book_tab: 'meals',
        result: { count: 1, id: 'farmersdelight:pumpkin_soup' }
    }).id('kubejs:cooking/pumpkin_soup')

    event.remove({ id: 'farmersdelight:cooking/onion_soup' })
    event.custom({
        type: 'farmersdelight:cooking',
        experience: 1.0,
        ingredients: [{ tag: 'c:crops/onion' }, { tag: 'c:crops/onion' }, { tag: 'c:foods/bread' }, milk250],
        recipe_book_tab: 'meals',
        result: { count: 1, id: 'farmersdelight:onion_soup' }
    }).id('kubejs:cooking/onion_soup')

    event.remove({ id: 'farmersdelight:cooking/glow_berry_custard' })
    event.custom({
        type: 'farmersdelight:cooking',
        experience: 1.0,
        ingredients: [{ item: 'minecraft:glow_berries' }, milk250, { tag: 'c:eggs' }, { item: 'minecraft:sugar' }],
        result: { count: 1, id: 'farmersdelight:glow_berry_custard' }
    }).id('kubejs:cooking/glow_berry_custard')

    // ===== 10. 功能抽屉 产水升级：2 桶水 + 蓝钢桶 + 石头 =====
    event.remove({ id: 'functionalstorage:water_generator_upgrade' })
    event.custom({
        type: 'tfc:advanced_shaped_crafting',
        pattern: ['IBI', 'IDI', 'IBI'],
        key: {
            B: water1000,
            D: { item: 'tfc:metal/bucket/blue_steel' },
            I: { tag: 'c:stones' }
        },
        result: { count: 1, id: 'functionalstorage:water_generator_upgrade' }
    }).id('kubejs:crafting/water_generator_upgrade')

    // ===== 11. 功能抽屉 滴液升级：岩浆桶不可得，改用玄武岩岩浆块（岩浆源意象）=====
    event.remove({ id: 'functionalstorage:dripping_upgrade' })
    event.custom({
        type: 'tfc:advanced_shaped_crafting',
        pattern: ['IBI', 'IDI', 'IRI'],
        key: {
            B: { item: 'minecraft:pointed_dripstone' },
            D: { item: 'minecraft:cauldron' },
            I: { tag: 'c:stones' },
            R: { item: 'tfc:rock/magma/basalt' }
        },
        result: { count: 1, id: 'functionalstorage:dripping_upgrade' }
    }).id('kubejs:crafting/dripping_upgrade')

    // ===== 12. 农夫乐事烹饪锅：c:buckets/water 标签（原版水桶不可得）→ 一桶水(1000mB) =====
    event.remove({ id: 'farmersdelight:cooking_pot' })
    event.custom({
        type: 'tfc:advanced_shaped_crafting',
        pattern: ['bSb', 'iWi', 'iii'],
        key: {
            S: { item: 'minecraft:wooden_shovel' },
            W: water1000,
            b: { item: 'minecraft:brick' },
            i: { tag: 'c:ingots/iron' }
        },
        primary_ingredient: water1000,
        result: { count: 1, id: 'farmersdelight:cooking_pot' }
    }).id('kubejs:crafting/cooking_pot')

    // ===== 13. create 注液/排液：木桶 ⇄ 水 =====
    // 原版水桶的两个配方（fill_minecraft_bucket_with_minecraft_water 等）是 JEI 展示的假配方，
    // 不在配方管理器里，remove 只是保险；木桶的注排液才是正道。
    // tfc:fluid 是 NeoForge FluidStack 组件（字段 id + amount），注满水的木桶写法如下。
    event.remove({ id: 'create:fill_minecraft_bucket_with_minecraft_water' })
    event.remove({ id: 'create:empty_minecraft_bucket_of_minecraft_water' })

    // 注液：空木桶 + 1000mB 水 → 装满水的木桶
    event.custom({
        type: 'create:filling',
        ingredients: [
            { item: 'tfc:wooden_bucket' },
            { type: 'neoforge:tag', amount: 1000, tag: 'minecraft:water' }
        ],
        results: [{
            id: 'tfc:wooden_bucket',
            components: { 'tfc:fluid': { amount: 1000, id: 'minecraft:water' } }
        }]
    }).id('kubejs:filling/wooden_bucket_water')

    // ===== 14. 封禁"木桶注岩浆" =====
    // Create 注液器对流体容器物品有通用灌注行为（不走配方），会把岩浆灌进木桶。
    // 利用"配方优先于通用灌注"的机制：加一条吃 1000mB 岩浆但只返还空木桶的配方，
    // 抢占匹配后注岩浆=什么都没发生，木桶岩浆桶无法产出。
    event.custom({
        type: 'create:filling',
        ingredients: [
            { item: 'tfc:wooden_bucket' },
            { type: 'neoforge:tag', amount: 1000, tag: 'minecraft:lava' }
        ],
        results: [{ id: 'tfc:wooden_bucket' }]
    }).id('kubejs:filling/wooden_bucket_lava_ban')

    // ===== 15. 电力学油类：木桶 ⇄ 变压器油/植物油 =====
    // 玩家反馈：变压器油不能用木桶装、不能进大桶、注液器灌不了。
    // 木桶白名单标签已在 tags/fluid.js 补齐，这里再补显式注液/排液配方兜底（对齐上面水的写法）。
    event.custom({
        type: 'create:filling',
        ingredients: [
            { item: 'tfc:wooden_bucket' },
            { type: 'neoforge:single', amount: 1000, fluid: 'electroenergetics:transformer_oil' }
        ],
        results: [{
            id: 'tfc:wooden_bucket',
            components: { 'tfc:fluid': { amount: 1000, id: 'electroenergetics:transformer_oil' } }
        }]
    }).id('kubejs:filling/wooden_bucket_transformer_oil')

    event.custom({
        type: 'create:emptying',
        ingredients: [{
            type: 'neoforge:components',
            items: 'tfc:wooden_bucket',
            components: { 'tfc:fluid': { amount: 1000, id: 'electroenergetics:transformer_oil' } }
        }],
        results: [
            { id: 'tfc:wooden_bucket' },
            { amount: 1000, id: 'electroenergetics:transformer_oil' }
        ]
    }).id('kubejs:emptying/wooden_bucket_transformer_oil')

    event.custom({
        type: 'create:filling',
        ingredients: [
            { item: 'tfc:wooden_bucket' },
            { type: 'neoforge:single', amount: 1000, fluid: 'electroenergetics:plant_oil' }
        ],
        results: [{
            id: 'tfc:wooden_bucket',
            components: { 'tfc:fluid': { amount: 1000, id: 'electroenergetics:plant_oil' } }
        }]
    }).id('kubejs:filling/wooden_bucket_plant_oil')

    event.custom({
        type: 'create:emptying',
        ingredients: [{
            type: 'neoforge:components',
            items: 'tfc:wooden_bucket',
            components: { 'tfc:fluid': { amount: 1000, id: 'electroenergetics:plant_oil' } }
        }],
        results: [
            { id: 'tfc:wooden_bucket' },
            { amount: 1000, id: 'electroenergetics:plant_oil' }
        ]
    }).id('kubejs:emptying/wooden_bucket_plant_oil')

    // 排液：装满水的木桶（组件精确匹配，只收满桶）→ 空木桶 + 1000mB 水
    event.custom({
        type: 'create:emptying',
        ingredients: [{
            type: 'neoforge:components',
            items: 'tfc:wooden_bucket',
            components: { 'tfc:fluid': { amount: 1000, id: 'minecraft:water' } }
        }],
        results: [
            { id: 'tfc:wooden_bucket' },
            { amount: 1000, id: 'minecraft:water' }
        ]
    }).id('kubejs:emptying/wooden_bucket_water')

    // ===== 16. 电力学三个"油桶合成"配方：原版 EE 油桶不可得，换成装变压器油的群峦木桶 =====
    // 玩家反馈：变压器/稳压器/六氟化硫断路器配方要 electroenergetics:transformer_oil_bucket（本包无法获得），
    // 玩家实际能做出的是带 tfc:fluid 组件的群峦木桶。删掉原配方，原样重建、油桶位换成群峦木桶。
    const OIL_BUCKET = {
        type: 'neoforge:components',
        items: 'tfc:wooden_bucket',
        components: { 'tfc:fluid': { amount: 1000, id: 'electroenergetics:transformer_oil' } }
    }

    event.remove({ id: 'electroenergetics:crafting/transformer' })
    event.custom({
        type: 'minecraft:crafting_shaped',
        category: 'misc',
        pattern: ['C C', 'WOW', 'T T'],
        key: {
            C: { item: 'electroenergetics:double_connector' },
            O: OIL_BUCKET,
            T: { item: 'electroenergetics:transformer_core_lamination' },
            W: { item: 'electroenergetics:copper_wire_spool' }
        },
        result: { count: 1, id: 'electroenergetics:transformer' }
    }).id('kubejs:crafting/transformer')

    event.remove({ id: 'electroenergetics:crafting/voltage_regulator' })
    event.custom({
        type: 'minecraft:crafting_shaped',
        category: 'misc',
        pattern: [' P ', 'WTW', ' O '],
        key: {
            O: OIL_BUCKET,
            P: { item: 'create:precision_mechanism' },
            T: { item: 'electroenergetics:transformer_core' },
            W: { item: 'electroenergetics:copper_wire_spool' }
        },
        result: { count: 1, id: 'electroenergetics:voltage_regulator' }
    }).id('kubejs:crafting/voltage_regulator')

    event.remove({ id: 'electroenergetics:mechanical_crafting/sulfur_hexafluoride_breaker' })
    event.custom({
        type: 'create:mechanical_crafting',
        accept_mirrored: false,
        category: 'misc',
        pattern: ['sCs', ' I ', ' S ', ' P ', 'sCs'],
        key: {
            C: { item: 'electroenergetics:connector' },
            I: { item: 'electroenergetics:insulator' },
            P: { item: 'create:precision_mechanism' },
            S: OIL_BUCKET,
            s: { tag: 'c:plates/iron' }
        },
        result: { count: 1, id: 'electroenergetics:sulfur_hexafluoride_breaker' },
        show_notification: false
    }).id('kubejs:mechanical_crafting/sulfur_hexafluoride_breaker')
})

// JEI 隐藏原版流体桶（本包不可得，显示会造成误导）
RecipeViewerEvents.removeEntries('item', event => {
    event.remove('minecraft:water_bucket')
    event.remove('minecraft:milk_bucket')
    event.remove('minecraft:lava_bucket')
    event.remove('minecraft:powder_snow_bucket')
    // 电力学变压器油桶同样不可得（合成已改用群峦木桶），一并隐藏
    event.remove('electroenergetics:transformer_oil_bucket')
})

// woodencog 序列组装中间态物品：无名字/紫黑贴图，是动力锯与冲压工序的内部产物
// ⚠️ 不用带斜杠正则（KubeJS 谓词转换会吞路径段导致误伤），枚举注册表 + 纯字符串匹配
RecipeViewerEvents.removeEntries('item', event => {
    var itemReg = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries').ITEM
    var wcCount = 0
    itemReg.forEach(item => {
        var key = String(itemReg.getKey(item))
        if (key.indexOf('woodencog:') == 0 && key.indexOf('unfinished') != -1) {
            event.remove(key)
            wcCount++
        }
    })
    console.log('[TFCR] woodencog unfinished entries hidden: ' + wcCount)
})
