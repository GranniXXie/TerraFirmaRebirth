ServerEvents.recipes(event => {
    const {shaped, shapeless} = event.recipes.kubejs
    
    //磁铁矿块直接合成 - 已移除（create_new_age 已删除，电力系统换代为 Electro Energetics）

    //树木肥料珊瑚用标签
    shapeless('2x create:tree_fertilizer', [
        '2x #minecraft:small_flowers',
        'minecraft:bone_meal',
        '#c:coral'
    ]).id('kubejs:tree_fertilizer')

    //用TFC面团制作粘液球
    shapeless('minecraft:slime_ball', [
        "#c:foods/dough",
        "minecraft:lime_dye"
    ]).id('kubejs:slime_ball')

    //砂纸
    shapeless('create:sand_paper',['tfc:wool_cloth','#c:sands'])
    .id('kubejs:sand_paper')

    //制作原版箱子
    shaped("7x minecraft:chest", [
        'QLQ',
        'QQQ',
        'QLQ'
    ],
    {
        L: 'create:iron_sheet',
        Q: "#c:chests/wooden",
    }).id('kubejs:chest')
    
    shaped("6x minecraft:barrel", [
        'QLQ',
        'Q Q',
        'QLQ'
    ],
    {
        L: 'create:iron_sheet',
        Q: "#c:chests/wooden",
    }).id('kubejs:barrel')

    //海洋之心
    shaped('minecraft:heart_of_the_sea', [
        'QQQ',
        'QLQ',
        'QQQ'
    ], {
        L: "minecraft:blue_ice",
        Q: '#c:gems'
    }).id('kubejs:heart_of_the_sea')

    //腐烂蜘蛛眼兼容
    shapeless("minecraft:fermented_spider_eye", [
        "beneath:food/portobello", "minecraft:spider_eye", "#tfc:foods/sweeteners"
    ]).id('kubejs:fermented_spider_eye')

    //黄铜板剪切配方
    shapeless('2x create:brass_sheet', [
        'tfc:metal/sheet/brass',
        'immersiveengineering:wirecutter'
    ]).damageIngredient({item: 'immersiveengineering:wirecutter'}, 1)
    .id('kubejs:brass_sheet')

    //铜板剪切配方（对齐黄铜）：原版铜锭不可得，create:copper_sheet 的压板路线断了，
    //群峦铜板+剪线钳剪出铜板——Create 发射器/无线红石链的前置材料
    shapeless('2x create:copper_sheet', [
        'tfc:metal/sheet/copper',
        'immersiveengineering:wirecutter'
    ]).damageIngredient({item: 'immersiveengineering:wirecutter'}, 1)
    .id('kubejs:copper_sheet')

    // 锻造台已全面禁用（remove.js 移除 minecraft:smithing 全类型），原下界合金锻造配方（蓝钢套+下界合金锭）随之失效。
    // 现以等量无序合成恢复下界合金套获取：蓝钢甲 + 下界合金锭 → 下界合金甲（成本与原配方一致，1+1→1 无翻倍风险）。
    // netherite_drill、netherite_kitchen_knife、netherite_knife 仍为禁用状态，不恢复。
    shapeless('minecraft:netherite_helmet', ['tfc:metal/helmet/blue_steel', 'minecraft:netherite_ingot']).id('kubejs:netherite_helmet')
    shapeless('minecraft:netherite_chestplate', ['tfc:metal/chestplate/blue_steel', 'minecraft:netherite_ingot']).id('kubejs:netherite_chestplate')
    shapeless('minecraft:netherite_leggings', ['tfc:metal/greaves/blue_steel', 'minecraft:netherite_ingot']).id('kubejs:netherite_leggings')
    shapeless('minecraft:netherite_boots', ['tfc:metal/boots/blue_steel', 'minecraft:netherite_ingot']).id('kubejs:netherite_boots')

    shapeless('2x create:item_hatch', [
        'tfc:metal/trapdoor/wrought_iron',
        'create:andesite_alloy'
    ]).id('create:crafting/logistics/item_hatch')

    // 石英种子已移除（AE2已删除）
    // shapeless('kubejs:crystal_seed_certus',["tfc:sand/white", "minecraft:quartz"])
    // .id('kubejs:crystal_seed_certus')

    //制作铁砧
    shapeless('minecraft:anvil','tfc:metal/anvil/wrought_iron').id('kubejs:anvil')

    //炼药锅：锻铁板材围成（群峦没有浇筑锅具的渠道，给一个板材配方）
    shaped('minecraft:cauldron', [
        'S S',
        'S S',
        'SSS'
    ], {
        S: 'tfc:metal/sheet/wrought_iron'
    }).id('kubejs:crafting/cauldron')

    // tfcr wooden_cogwheel recipes removed - mod not installed
    // shaped("4x tfcr:wooden_cogwheel", [
    //     'QLQ',
    //     'LML',
    //     'QLQ'
    // ],
    // {
    //     L: "#c:rods/wooden",
    //     Q: "#minecraft:planks",
    //     M: "tfc:glue"
    // }).id('kubejs:wooden_cogwheel')
    
    // event.replaceInput({output:"#tfc:gear_boxes"}, "#tfc:brass_mechanisms", "tfcr:wooden_cogwheel")
    // event.replaceInput({output:"#tfc:clutches"}, ["#tfc:brass_mechanisms", "#c:dusts/redstone"], "tfcr:wooden_cogwheel")

    //合金窑砖配方
    shapeless('immersiveengineering:alloybrick',['minecraft:brick','#c:sandstone/blocks'])
    .id('kubejs:alloybrick')

    // 下界合金锭：删除一切工作台配方（含原版碎片+金锭），唯一来源 = 电弧炉 8红钢+8蓝钢+32地狱疣
    event.remove({ id: 'minecraft:netherite_ingot' })

    //安山漏斗
    shaped("create:andesite_funnel", [
        'a',
        'b'
    ], {
        a:"create:andesite_alloy",
        b:'#c:leathers'
    }).id('kubejs:andesite_funnel')

    shapeless("kaleidoscope_cookery:nether_style_sashimi", [
        notRotten("minecraft:crimson_fungus"),
        notRotten("minecraft:warped_fungus"),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        "minecraft:bowl"
    ]).id('kubejs:nether_style_sashimi')

    shapeless("kaleidoscope_cookery:end_style_sashimi", [
        notRotten("minecraft:chorus_fruit"),
        notRotten("minecraft:chorus_fruit"),
        notRotten("minecraft:chorus_fruit"),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        "minecraft:bowl"
    ]).id('kubejs:end_style_sashimi')

    shapeless("kaleidoscope_cookery:desert_style_sashimi", [
        "tfc:plant/saguaro_fruit",
        "tfc:plant/saguaro_fruit",
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        "minecraft:bowl"
    ]).id('kubejs:desert_style_sashimi')

    shapeless("kaleidoscope_cookery:tundra_style_sashimi", [
        '#minecraft:flowers',
        '#minecraft:flowers',
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        "minecraft:bowl"
    ]).id('kubejs:tundra_style_sashimi')

    shapeless("kaleidoscope_cookery:cold_style_sashimi", [
        "minecraft:snowball",
        "minecraft:snowball",
        "minecraft:snowball",
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        notRotten('#c:foods/raw_fish'),
        "minecraft:bowl"
    ]).id('kubejs:cold_style_sashimi')

    // sink配方已移除（依赖MEK和AE2）
    // shaped("cookingforblockheads:sink", [
    //     'aaa',
    //     'bcb',
    //     'ddd'
    // ], {
    //     a:"mekanism:ingot_refined_glowstone",
    //     b:Item.of('mekanism:ultimate_fluid_tank', '{mekData:{FluidTanks:[{stored:{Amount:256000,FluidName:"minecraft:water"}}]}}').weakNBT(),
    //     c:"ae2:singularity",
    //     d:"minecraft:terracotta"
    // }).id('kubejs:sink')

    shaped("tfc:fire_clay", [
        'aba',
        'bcb',
        'aba'
    ], {
        a:"tfc:powder/kaolinite",
        b:"tfc:powder/coke",
        c:"minecraft:clay_ball"
    }).id('kubejs:fire_clay')

    // hdpe_elytra配方已移除（依赖MEK）
    // shaped("mekanism:hdpe_elytra", [
    //     'aba',
    //     'bcb',
    //     'b b'
    // ], {
    //     a:"mekanism:alloy_atomic",
    //     b:"mekanism:hdpe_sheet",
    //     c:"immersiveengineering:glider"
    // }).id('kubejs:hdpe_elytra')

    event.replaceOutput({id: 'minecraft:leather'}, "minecraft:leather", "tfc:small_raw_hide")

    // 葡萄藤定位器：模组本体没给配方。罗盘+一段野葡萄藤（问路引子），帮你找下一片野藤
    shapeless('kaleidoscopetfctavern:grapevine_locator', [
        'minecraft:compass',
        '#kaleidoscopetfctavern:grapevine'
    ]).id('kubejs:grapevine_locator')

    // insulating_resin配方已移除（依赖AE2/appflux）
    // shapeless("appflux:insulating_resin", ["minecraft:bone_meal", "ae2:silicon", "minecraft:glowstone_dust", "minecraft:green_dye"]).id('kubejs:insulating_resin')

    // netherite_drill / netherite_kitchen_knife / netherite_knife 的锻造配方已随 smithing 全禁一并废止（见文件头部注释）
})
