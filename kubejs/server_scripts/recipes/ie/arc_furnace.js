ServerEvents.recipes(event => {

    const preId = 'immersiveengineering:arc_furnace/'
    /**
     * 电弧炉
     * @param {Internal.ItemStack_[]} results 
     * @param {Ingredient_} input 
     * @param {Ingredient_[]?} additives 
     * @param {number?} time 
     * @param {number?} energy 
     * @param {boolean?} slag 
     * @returns {Internal.RecipeJS_}
     */
    function arc_furnace(results, input, additives, time, energy, slag) {
        return event.custom(arc_furnace_json(results, input, additives, time, energy, slag))
    }

    //下界合金制作
    arc_furnace(
        "minecraft:netherite_ingot", 
        "8x tfc:metal/ingot/red_steel", 
        [
            "8x tfc:metal/ingot/blue_steel",
            "32x minecraft:nether_wart"
        ],
        400,
        102400
    ).id(preId + 'netherite_ingot')

    //下界合金碎片利用（沿用4碎片+4金的原版配比，金用群峦金锭）
    arc_furnace(
        "minecraft:netherite_ingot",
        "4x minecraft:netherite_scrap",
        [pureIngot(4, 'tfc:metal/ingot/gold', 'gold')],
        400,
        102400
    ).id(preId + 'netherite_ingot_from_scrap')

    //电弧烧铅
    arc_furnace("2x immersiveengineering:ingot_lead", "3x tfc_ie_addon:ore/rich_galena", [], 100, 25600)
    .id(preId + 'ingot_lead')

    arc_furnace("2x immersiveengineering:ingot_lead", "7x tfc_ie_addon:ore/poor_galena", [], 100, 25600)
    .id(preId + 'ingot_lead_1')

    arc_furnace("immersiveengineering:ingot_lead", "2x tfc_ie_addon:ore/normal_galena", [], 100, 25600)
    .id(preId + 'ingot_lead_2')

    arc_furnace("immersiveengineering:ingot_lead", "5x tfc_ie_addon:ore/small_galena", [], 100, 25600)
    .id(preId + 'ingot_lead_3')


    //电弧自动黑钢
    arc_furnace(
        "tfc:metal/ingot/black_steel", 
        "tfc:metal/ingot/weak_steel", 
        "tfc:metal/ingot/pig_iron", 
        100, 25600
    ).id(preId + 'black_steel')

    //修正：附属自带的 tfc_ie_addon:arcfurnace/weak_steel 主输入是黑钢（配比不符合 TFC 定义），先删掉
    event.remove({ id: 'tfc_ie_addon:arcfurnace/weak_steel' })

    //电弧自动脆钢（对齐 TFC 坩埚合金定义：钢50-70% + 镍15-25% + 黑铜15-25%，取 3:1:1 = 60/20/20；合金配方不出矿渣）
    arc_furnace(
        "5x tfc:metal/ingot/weak_steel",
        "3x tfc:metal/ingot/steel",
        ["tfc:metal/ingot/nickel", "tfc:metal/ingot/black_bronze"],
        100, 25600
    ).id(preId + 'weak_steel')

    //电弧自动不锈钢（对齐 Firmalife 坩埚合金定义：钢60-80% + 铬20-30% + 镍10-20%，取 7:2:1 = 70/20/10）
    arc_furnace(
        "10x firmalife:metal/ingot/stainless_steel",
        "7x tfc:metal/ingot/steel",
        ["2x firmalife:metal/ingot/chromium", "tfc:metal/ingot/nickel"],
        100, 25600
    ).id(preId + 'stainless_steel')

    //电弧自动脆红钢（对齐 TFC 合金定义：黑钢50-55% + 钢20-25% + 黄铜10-15% + 玫瑰金10-15%）
    arc_furnace(
        "9x tfc:metal/ingot/weak_red_steel",
        "5x tfc:metal/ingot/black_steel",
        ["2x tfc:metal/ingot/steel", "tfc:metal/ingot/brass", "tfc:metal/ingot/rose_gold"],
        100, 25600
    ).id(preId + 'weak_red_steel')

    //——— 铅青铜体系（alloy_ext 配方调整）———
    //删掉纯铅坩埚配方：方铅矿铜器时代即可熔，纯铅代锡会绕过青铜时代的锡门槛
    event.remove({ id: 'tfc:alloy/lead_bronze' })
    //混合版收紧为必须含锡（铅不固溶于铜，现实的铅青铜必含锡）：锡 2%-12%，铅 0%-10%
    event.remove({ id: 'tfc:alloy/lead_bronze_with_tin' })
    event.custom({
        "type": "tfc:alloy",
        "contents": [
            {"fluid": "tfc:metal/copper", "max": 0.92, "min": 0.88},
            {"fluid": "tfc_ie_addon:metal/lead", "max": 0.1, "min": 0.0},
            {"fluid": "tfc:metal/tin", "max": 0.12, "min": 0.02}
        ],
        "result": "tfc:metal/bronze"
    }).id('tfc:alloy/lead_bronze_with_tin')
    //电弧炉铅青铜：工业时代专属直炼（对齐 tfc_ie_addon 的 9铜+1锡→10青铜 干净青铜配方），pureIngot 防劣等锭混入
    arc_furnace(
        "10x tfc:metal/ingot/bronze",
        pureIngot(9, 'tfc:metal/ingot/copper', 'copper'),
        [pureIngot(1, 'immersiveengineering:ingot_lead', 'lead')],
        100, 51200
    ).id(preId + 'lead_bronze')

    //附属自带的 tfc_ie_addon:arcfurnace/steel 只认焦炭粉，重写为兼容石墨粉（对齐 3.4）
    event.remove({ id: 'tfc_ie_addon:arcfurnace/steel' })
    arc_furnace(
        "tfc:metal/ingot/steel",
        "#c:ingots/wrought_iron",
        Ingredient.of(['#c:dusts/coal_coke', 'tfc:powder/graphite']),
        400, 204800,
        true
    ).id(preId + 'steel')
    
    arc_furnace(
        "tfc:metal/ingot/blue_steel",
        "tfc:metal/ingot/weak_blue_steel",
        "tfc:metal/ingot/black_steel",
        100, 25600
    ).id(preId + 'blue_steel')

    arc_furnace(
        "tfc:metal/ingot/red_steel",
        "tfc:metal/ingot/weak_red_steel",
        "tfc:metal/ingot/black_steel",
        100, 25600
    ).id(preId + 'red_steel')

    //电弧烧原版玻璃瓶
    arc_furnace(
        "3x minecraft:glass_bottle", 
        "3x minecraft:glass", 
        [],
        100, 12800
    ).id(preId + 'glass_bottle')

    //锻铁加木炭变生铁
    arc_furnace(
        "tfc:metal/ingot/pig_iron", 
        "tfc:metal/ingot/wrought_iron", 
        "#c:charcoal",
        400,
        102400,
        true
    ).id(preId + 'pig_iron')

    //铸铁直接变锻铁，不需要炭
    arc_furnace(
        "tfc:metal/ingot/wrought_iron", 
        "tfc:metal/ingot/cast_iron", 
        false,
        400,
        102400
    ).id(preId + 'wrought_iron')

    const recipes = [
        [
            "2x minecraft:glass", "tfc:silica_glass_batch", "tfc:silica_glass_batch"
        ],
        [
            "minecraft:tinted_glass", "#tfc:glass_batches_not_tier_1", "tfc:powder/amethyst"
        ],
        [
            "minecraft:white_stained_glass", "#tfc:glass_batches_tier_2", "tfc:powder/soda_ash"
        ],
        [
            "minecraft:light_gray_stained_glass", "#tfc:glass_batches",
            ["2x tfc:powder/soda_ash", "tfc:powder/graphite"]
        ],
        [
            "minecraft:gray_stained_glass", "#tfc:glass_batches",
            ["tfc:powder/soda_ash", "tfc:powder/graphite"]
        ],
        [
            "minecraft:black_stained_glass", "#tfc:glass_batches", "tfc:powder/graphite"
        ],
        [
            "minecraft:brown_stained_glass", "#tfc:glass_batches", "tfc:powder/garnierite"
        ],
        [
            "minecraft:red_stained_glass", "#tfc:glass_batches_tier_2", "tfc:powder/cassiterite"
        ],
        [
            // 方案B（3.4手感）：任意玻璃批次 + 2份赤铁矿粉调色，不破坏玻璃链
            "minecraft:orange_stained_glass", "#tfc:glass_batches", "2x tfc:powder/hematite"
        ],
        [
            "minecraft:yellow_stained_glass", "#tfc:glass_batches_tier_2", 
            [["tfc_ie_addon:powder/galena", "tfc:powder/native_silver"]]
        ],
        [
            "minecraft:lime_stained_glass", "#tfc:glass_batches_tier_2",
            ["tfc:powder/soda_ash", '#tfc:glassdusts/iron']
        ],
        [
            "minecraft:lime_stained_glass", "#tfc:glass_batches_tier_2", "tfc_ie_addon:powder/uraninite", "1"
        ],
        [
            "2x minecraft:green_stained_glass", "tfc:olivine_glass_batch", "tfc:olivine_glass_batch"
        ],
        [
            "minecraft:green_stained_glass", "#tfc:glass_batches_tier_2", "#tfc:glassdusts/iron", "1"
        ],
        [
            "minecraft:cyan_stained_glass", "#tfc:glass_batches_tier_2", "tfc:powder/lapis_lazuli"
        ],
        [
            "minecraft:light_blue_stained_glass", "tfc:silica_glass_batch", "tfc:powder/lapis_lazuli"
        ],
        [
            "minecraft:blue_stained_glass", "tfc:silica_glass_batch", 
            [['#tfc:glassdusts/copper', "tfc:volcanic_glass_batch"]]
        ],
        [
            "minecraft:purple_stained_glass", "#tfc:glass_batches", 
            ["#tfc:glassdusts/iron", "#tfc:glassdusts/copper"]
        ],
        [
            "minecraft:magenta_stained_glass", "#tfc:glass_batches_tier_2", "tfc:powder/ruby"
        ],
        [
            "minecraft:pink_stained_glass", "tfc:silica_glass_batch", "tfc:powder/native_gold"
        ],
        [
            "2x tfc:volcanic_glass_bottle", "tfc:volcanic_glass_batch", "tfc:powder/flux", "volcanic_bottle"
        ],
        [
            "2x tfc:silica_glass_bottle", "tfc:silica_glass_batch", "tfc:powder/flux", "silica_bottle"
        ],
        [
            "2x tfc:hematitic_glass_bottle", "tfc:hematitic_glass_batch", "tfc:powder/flux", "hematitic_bottle"
        ],
        [
            "2x tfc:olivine_glass_bottle", "tfc:olivine_glass_batch", "tfc:powder/flux", "olivine_bottle"
        ],
        [
            '2x tfc:lamp_glass', "#tfc:glass_batches", 'tfc:lamp_glass'
        ],
        // 强化玻璃/酒杯/透镜：辅料各不相同，避免与裸烧瓶子抢输入（IE电弧炉按输入+辅料匹配，
        // 之前森罗空瓶无辅料，会抢走所有裸批次导致透镜等永远做不出；也顺手解掉自引用辅料的死锁）
        [
            '2x firmalife:reinforced_glass', "tfc:silica_glass_batch", '#tfc:glassdusts/iron'
        ],
        [
            '3x firmalife:wine_glass', "tfc:silica_glass_batch", 'tfc:powder/lime'
        ],
        [
            '2x tfc:lens', "2x tfc:silica_glass_batch", 'tfc:powder/soda_ash'
        ],
        [
            '2x tfc:empty_jar', "#tfc:glass_batches_tier_2", 'tfc:empty_jar'
        ]
    ]

    recipes.forEach(r => {
        let id = preId + r[0].split(':')[1]
        if(r[3]) {
            arc_furnace(r[0], r[1], r[2], 100, 51200).id(`${id}_${r[3]}`)
        } else {
            arc_furnace(r[0], r[1], r[2], 100, 51200).id(id)
        }
    })

    //森罗酒馆空酒瓶电弧量产：只用橄榄石批次+盐粉（辅料防止抢走裸批次输入；
    //原先四批次无辅料版本会劫持所有裸玻璃批次，导致透镜/瓶子配方全部失效）
    arc_furnace("2x kaleidoscope_tavern:empty_bottle", "tfc:olivine_glass_batch", "tfc:powder/salt", 100, 51200).id(preId + 'tavern_empty_bottle_olivine')

    arc_furnace(
        'minecraft:brick',
        'tfc:ceramic/unfired_brick',
        false,
        50,
        6400
    ).id(preId + 'brick')

    // 4 条 dust 配方已删除：kubejs:dust_black_steel/dust_bismuth/dust_zinc/dust_chromium 物品未注册
})
