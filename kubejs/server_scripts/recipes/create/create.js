ServerEvents.recipes(event => {

    const {
        milling, 
        deploying, 
        mixing, 
        sequenced_assembly, 
        compacting, 
        splashing,
        crushing,
        mechanical_crafting,
        pressing,
        filling,
        haunting
    } = event.recipes.create

    const {shaped} = event.recipes.kubejs

    const {vein, drilling} = event.recipes.createoreexcavation

    // tfcoreprocessing items do not exist - commented out
    // milling("tfcoreprocessing:kindle/sawdust","#tfc:lumber")
    // .id('create:milling/sawdust')

    // milling("2x tfcoreprocessing:kindle/sawdust","minecraft:hay_block")
    // .id('create:milling/sawdust_2')

    // milling("tfcoreprocessing:kindle/sawdust",'tfc:thatch')
    // .id('create:milling/sawdust_3')

    // milling("2x tfcoreprocessing:kindle/sawdust",'tfc:stick_bundle')
    // .id('create:milling/sawdust_4')

    // milling("2x tfcoreprocessing:kindle/sawdust","#minecraft:leaves")
    // .id('create:milling/sawdust_5')

    //棕榈与竹子燃料
    // milling("8x tfcoreprocessing:kindle/palm_fiber","#tfc:palm_logs")
    // .id('create:milling/palm_fiber')

    // milling("tfcoreprocessing:kindle/bamboo_fiber",'minecraft:bamboo')
    // .id('create:milling/bamboo_fiber')
    
    //木炭粉与煤粉
    event.custom({
        type: 'create:milling',
        ingredients: [{tag: 'c:charcoal'}],
        results: [{id: 'tfc:powder/charcoal', count: 4}]
    }).id('create:milling/charcoal')

    // tfcoreprocessing items do not exist
    // milling('6x tfcoreprocessing:kindle/coal_dust','tfc:ore/bituminous_coal')
    // .id('create:milling/coal_dust')

    // milling('4x tfcoreprocessing:kindle/coal_dust','tfc:ore/lignite')
    // .id('create:milling/coal_dust_1')

    //e.remove({output:'minecraft:black_dye',input:'minecraft:charcoal'})

    //焦炭粉
    // milling('6x tfcoreprocessing:kindle/coke_dust','immersiveengineering:coal_coke')
    // .id('create:milling/coal_dust_2')

    //碱液自动
    mixing([Fluid.of('tfc:lye',500)],[Fluid.water(500),"tfc:powder/wood_ash"])
    .id('create:mixing/lye')

    //胶水制作
    mixing('tfc:glue',[Fluid.of('tfc:limewater',500),'minecraft:bone_meal'])
    .heated()
    .id('create:mixing/glue')

    //砂浆制作（tag 成分需原生 JSON）
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {tag: 'c:sands', count: 4},
            {type: 'neoforge:single', fluid: 'tfc:limewater', amount: 400}
        ],
        results: [{id: 'tfc:mortar', count: 64}]
    }).id('create:mixing/mortar')

    //石灰水
    mixing([Fluid.of('tfc:limewater',500)],[Fluid.water(500),"tfc:powder/lime"])
    .id('create:mixing/limewater')

    //生石灰烤制
    mixing('4x tfc:powder/lime','4x tfc:powder/flux').heated()
    .id('create:mixing/lime')

    //强力胶
    event.replaceInput({id:'create:crafting/kinetics/super_glue'},'minecraft:slime_ball','tfc:glue')

    //货物蛙港：粘液球→群峦胶水（与强力胶同一替代口径）
    event.replaceInput({id:'create:crafting/logistics/package_frogport'},'#c:slimeballs','tfc:glue')

    //黏贴器、粘性机械活塞：同一替代口径，粘液球→群峦胶水
    event.replaceInput({id:'create:crafting/kinetics/sticker'},'#c:slimeballs','tfc:glue')
    event.replaceInput({id:'create:crafting/kinetics/sticky_mechanical_piston'},'#c:slimeballs','tfc:glue')

    //砂纸
    event.replaceInput({id:'create:crafting/materials/sand_paper'},'minecraft:sand','#c:sands')
    
    //粘液矿磨碎
    milling('minecraft:slime_ball','beneath:raw_slime')
    .id('kubejs:milling/slime_ball')

    //钾石岩和硝石粉碎
    milling('4x tfc:powder/saltpeter','tfc:ore/saltpeter')
    .id('kubejs:milling/saltpeter')

    milling('4x tfc:powder/sylvite','tfc:ore/sylvite')
    .id('kubejs:milling/sylvite')

    //麦机动磨粉
    milling("tfc:food/barley_flour", "tfc:food/barley_grain")
    .id('kubejs:milling/barley_grain')
    milling("tfc:food/oat_flour", "tfc:food/oat_grain")
    .id('kubejs:milling/oat_flour')
    milling("tfc:food/rye_flour", "tfc:food/rye_grain")
    .id('kubejs:milling/rye_flour')
    milling("tfc:food/wheat_flour", "tfc:food/wheat_grain")
    .id('kubejs:milling/wheat_flour')
    milling("tfc:food/maize_flour", "tfc:food/maize_grain")
    .id('kubejs:milling/maize_flour')
    milling("tfc:food/rice_flour", "tfc:food/rice_grain")
    .id('kubejs:milling/rice_flour')
    milling("firmalife:food/masa_flour", "firmalife:food/nixtamal")
    .id('kubejs:milling/masa_flour')

    //磨橄榄
    milling('2x tfc:olive_paste', 'tfc:food/olive')
    .id('kubejs:milling/olive_paste')

    //造纸
    sequenced_assembly('8x minecraft:paper', 'create:cardboard', [
        deploying('kubejs:unfinished_paper', ['kubejs:unfinished_paper','minecraft:white_dye']),
        pressing('kubejs:unfinished_paper', 'kubejs:unfinished_paper'),
    ])
    .transitionalItem('kubejs:unfinished_paper')
    .loops(1)
    .id('create:sequenced_assembly/paper')

    //烈焰蛋糕调整
    event.replaceInput({output:'create:blaze_cake_base'}, "minecraft:egg", "#c:dough")

    // tfcr蓝钢罐头 recipes removed - mod not installed
    // compacting('2x tfcr:blue_steelcan1','tfc:metal/sheet/blue_steel')
    // .superheated()
    // .id('create:compacting/blue_steelcan1')

    // artisanal milk items do not exist - commented out
    // mixing("artisanal:milk_flakes", Fluid.of("minecraft:milk",200))
    // .heated()
    // .id('create:mixing/milk_flakes')

    // milling("2x artisanal:powdered_milk", "artisanal:milk_flakes")
    // .id('create:milling/powdered_milk')

    // mixing("artisanal:goat_milk_flakes",Fluid.of("firmalife:goat_milk",200))
    // .heated()
    // .id('create:mixing/goat_milk_flakes')

    // milling("2x artisanal:powdered_goat_milk","artisanal:goat_milk_flakes")
    // .id('create:milling/powdered_goat_milk')

    // mixing("artisanal:yak_milk_flakes",Fluid.of("firmalife:yak_milk",200))
    // .heated()
    // .id('create:mixing/yak_milk_flakes')

    // milling("2x artisanal:powdered_yak_milk","artisanal:yak_milk_flakes")
    // .id('create:milling/powdered_yak_milk')

    //洗沙砾出铁矿而不是粒（Create 1.21 原生 JSON，tag 成分不能被 KJS 序列化）
    //褐铁矿掉率改为 10%（批量洗涤刷铁效率过高）
    event.custom({
        type: 'create:splashing',
        ingredients: [{tag: 'c:gravels'}],
        results: [
            {id: 'minecraft:flint'},
            {id: 'tfc:ore/small_limonite', chance: 0.1}
        ]
    }).id('create:splashing/gravel')

    //下界岩粉碎
    crushing([
        "create:cinder_flour",
        "create:cinder_flour"
    ], "beneath:cobblerack").id('create:crushing/cobblerack')

    //IE线防腐木材量产（搅拌）：产物为 tfc_ie_addon 防腐木材（4个合成IE防腐木板，多方块结构用）
    //firmalife 温室处理木材走自己的蜂蜡合成配方（8木材围蜂蜡），与本配方互不冲突
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {tag: 'tfc:lumber', count: 8},
            {type: 'neoforge:single', fluid: 'immersiveengineering:creosote', amount: 1000}
        ],
        results: [{id: 'tfc_ie_addon:treated_wood_lumber', count: 8}]
    }).id('create:mixing/treated_lumber')
    
    //甜菜炼糖浆/糖浆制糖/清洗甘蔗 - 已移除：artisanal 模组不在包内（molasses、cleaned_sugarcane、non_perishable_sugar 均不存在）

    //清洗黄麻网（artisanal:soapy_water 不存在，改用清水）
    mixing('4x tfc:jute_net', ['4x tfc:dirty_jute_net', Fluid.water(1000)])
    .id('create:mixing/jute_net')

    // 钻机
    mechanical_crafting("createoreexcavation:drilling_machine", [
        "abcba",
        "bdedb",
        "fghgi",
        "bjjjb",
        "abbba"
    ], {
        a: "#c:storage_blocks/steel",
        b: "create:brass_sheet",
        c: "create:copper_casing",
        d: "create:electron_tube",
        e: "create:spout",
        f: "create:brass_casing",
        g: "create:precision_mechanism",
        h: "create:mechanical_drill",
        i: "create:brass_tunnel",
        j: "create:sturdy_sheet"
    }).id('createoreexcavation:drilling_machine')

    //探矿杖：红石原矿（原版，包内挖不到）换成任意 TFC 宝石；末影之眼（无末影人/烈焰人）换成群峦透镜
    event.replaceInput({ id: 'createoreexcavation:vein_finder' }, '#c:ores/redstone',
        ['tfc:gem/diamond', 'tfc:gem/emerald', 'tfc:gem/ruby', 'tfc:gem/sapphire', 'tfc:gem/topaz', 'tfc:gem/opal', 'tfc:gem/lapis_lazuli', 'tfc:gem/amethyst', 'tfc:gem/pyrite'])
    event.replaceInput({ id: 'createoreexcavation:vein_finder' }, 'minecraft:ender_eye', 'tfc:lens')

    // 钻石钻头：原配方要 1 钻石块（#c:storage_blocks/diamond，本包禁止宝石压缩、标签为空、拿不到），
    // 且合成台单格写不了数量，改为经典"环绕升级"布局：钻头居中、8 颗 TFC 钻石围一圈。
    // 比原版 13 钻略省，但群峦钻石（金伯利岩金刚石）极稀有，8 颗已经是终局级投入。
    event.remove({ id: 'createoreexcavation:diamond_drill' })
    event.shaped('createoreexcavation:diamond_drill', [
        'iii',
        'idi',
        'iii'
    ], {
        d: 'createoreexcavation:drill',
        i: 'tfc:gem/diamond'
    }).id('kubejs:crafting/diamond_drill')

    // 矿脉图鉴：原配方四格有三格在包内拿不到——#c:chests 标签为空、地图要指南针（红石不可得）、
    //  writable_book 要墨囊（无鱿鱼）。改为：紫水晶 + 书 + 木箱 + 群峦透镜（勘测主题，与探矿杖呼应）。
    event.remove({ id: 'createoreexcavation:vein_atlas' })
    event.shaped('createoreexcavation:vein_atlas', [
        'ca',
        'mb'
    ], {
        a: 'tfc:gem/amethyst',
        b: 'minecraft:book',
        c: '#c:chests/wooden',
        m: 'tfc:lens'
    }).id('kubejs:crafting/vein_atlas')

    // ===== 全套矿脉钻探 =====
    // 3.2 的矿脉来自已停更的附属 TFC Ore Excavation（仅 1.20），1.21 没有对应附属，这里自建。
    // vein(名称, 图标).placement(区块间隔, 最小间隔, 种子)；drilling([产出], 矿脉id, 每轮tick)
    // 产出为 正常品位+贫瘠品位 混合，模拟手工采矿；稀有矿加大间隔和耗时。
    const oreVeins = [
        // id, 名称, 图标, [产出], 区块间隔, 最小间隔, 每轮tick
        // —— 燃料与工业矿物 ——
        ['coal',         '煤矿脉',      'tfc:ore/bituminous_coal',       ['2x tfc:ore/bituminous_coal', '2x tfc:ore/lignite'],          192, 96,  400],
        ['saltpeter',    '硝石矿脉',    'tfc:ore/saltpeter',             ['2x tfc:ore/saltpeter', '2x tfc:ore/sulfur'],                 256, 128, 500],
        ['halite',       '盐矿脉',      'tfc:ore/halite',                ['2x tfc:ore/halite', '2x tfc:ore/gypsum'],                    256, 128, 400],
        ['borax',        '硼砂矿脉',    'tfc:ore/borax',                 ['2x tfc:ore/borax', '2x tfc:ore/gypsum'],                     320, 160, 400],
        ['graphite',     '石墨矿脉',    'tfc:ore/graphite',              ['2x tfc:ore/graphite', '2x tfc:ore/bituminous_coal'],         320, 160, 500],
        ['cinnabar',     '朱砂矿脉',    'tfc:ore/cinnabar',              ['2x tfc:ore/cinnabar', '2x tfc:ore/cryolite'],                288, 144, 500],
        ['lapis',        '青金石矿脉',  'tfc:ore/lapis_lazuli',          ['2x tfc:ore/lapis_lazuli', '2x tfc:ore/pyrite'],              320, 160, 500],
        // —— 铜系 ——
        ['native_copper','自然铜矿脉',  'tfc:ore/normal_native_copper',  ['2x tfc:ore/normal_native_copper', '2x tfc:ore/poor_native_copper'], 224, 112, 400],
        ['malachite',    '孔雀石矿脉',  'tfc:ore/normal_malachite',      ['2x tfc:ore/normal_malachite', '2x tfc:ore/poor_malachite'],  224, 112, 400],
        ['tetrahedrite', '黝铜矿脉',    'tfc:ore/normal_tetrahedrite',   ['2x tfc:ore/normal_tetrahedrite', '2x tfc:ore/poor_tetrahedrite'], 256, 128, 450],
        // —— 锡锌铋镍 ——
        ['cassiterite',  '锡石矿脉',    'tfc:ore/normal_cassiterite',    ['2x tfc:ore/normal_cassiterite', '2x tfc:ore/poor_cassiterite'], 256, 128, 450],
        ['sphalerite',   '闪锌矿脉',    'tfc:ore/normal_sphalerite',     ['2x tfc:ore/normal_sphalerite', '2x tfc:ore/poor_sphalerite'], 256, 128, 450],
        ['bismuthinite', '辉铋矿脉',    'tfc:ore/normal_bismuthinite',   ['2x tfc:ore/normal_bismuthinite', '2x tfc:ore/poor_bismuthinite'], 288, 144, 500],
        ['garnierite',   '镍矿脉',      'tfc:ore/normal_garnierite',     ['2x tfc:ore/normal_garnierite', '2x tfc:ore/poor_garnierite'], 288, 144, 500],
        // —— 铁系 ——
        ['hematite',     '赤铁矿脉',    'tfc:ore/normal_hematite',       ['2x tfc:ore/normal_hematite', '2x tfc:ore/poor_hematite'],    224, 112, 400],
        ['limonite',     '褐铁矿脉',    'tfc:ore/normal_limonite',       ['2x tfc:ore/normal_limonite', '2x tfc:ore/poor_limonite'],    224, 112, 400],
        ['magnetite',    '磁铁矿脉',    'tfc:ore/normal_magnetite',      ['2x tfc:ore/normal_magnetite', '2x tfc:ore/poor_magnetite'],  256, 128, 450],
        // —— 贵金属 ——
        ['native_gold',  '自然金矿脉',  'tfc:ore/normal_native_gold',    ['2x tfc:ore/normal_native_gold', '2x tfc:ore/poor_native_gold'], 384, 192, 600],
        ['native_silver','自然银矿脉',  'tfc:ore/normal_native_silver',  ['2x tfc:ore/normal_native_silver', '2x tfc:ore/poor_native_silver'], 320, 160, 550],
        // —— 宝石（七选一，看脸）——
        ['gems',         '稀有宝石矿脉','tfc:ore/diamond',               ['tfc:ore/diamond', 'tfc:ore/emerald', 'tfc:ore/ruby', 'tfc:ore/sapphire', 'tfc:ore/topaz', 'tfc:ore/opal', 'tfc:ore/amethyst'], 448, 224, 800],
        // —— 附属模组 ——
        ['chromite',     '铬铁矿脉',    'firmalife:ore/normal_chromite', ['2x firmalife:ore/normal_chromite', '2x firmalife:ore/poor_chromite'], 384, 192, 600],
        ['bauxite',      '铝土矿脉',    'tfc_ie_addon:ore/normal_bauxite', ['2x tfc_ie_addon:ore/normal_bauxite', '2x tfc_ie_addon:ore/poor_bauxite'], 288, 144, 500],
        ['galena',       '方铅矿脉',    'tfc_ie_addon:ore/normal_galena', ['2x tfc_ie_addon:ore/normal_galena', 'tfc:ore/normal_native_silver'], 288, 144, 500],
        ['uraninite',    '晶质铀矿脉',  'tfc_ie_addon:ore/normal_uraninite', ['2x tfc_ie_addon:ore/normal_uraninite', '2x tfc_ie_addon:ore/poor_uraninite'], 448, 224, 800],
        // —— 航空学钛 ——
        ['titanium',     '钛矿脉',      'rocketnautics:titanium_ore',    ['2x rocketnautics:titanium_ore'], 448, 224, 800],
    ]
    oreVeins.forEach(([id, name, icon, outputs, spacing, sep, ticks], i) => {
        vein(Text.of(name), icon)
            .placement(spacing, sep, 64825185 + i * 7919)
            .id(`create:vein/${id}`)
        drilling(outputs.map(o => Item.of(o)), `create:vein/${id}`, ticks)
            .id(`create:drilling/${id}`)
    })

    // —— 下界专属：远古残骸（下界合金除成就奖励外的唯一来源）——
    // 最稀有档位，只能在下界群系探到，防止主世界乱入
    vein(Text.of('远古残骸矿脉'), 'minecraft:ancient_debris')
        .placement(512, 256, 64825185 + 26 * 7919)
        .biomeWhitelist('minecraft:is_nether')
        .id('create:vein/ancient_debris')
    drilling([Item.of('2x minecraft:ancient_debris')], 'create:vein/ancient_debris', 1000)
        .id('create:drilling/ancient_debris')

    // —— 下界专属：石英（玩家反馈石英没有增产手段，只能手挖下界石英矿）——
    // 石英是玫瑰石英→电子管产业链的上游，需求量大，给到银矿级稀有度；
    // 远低于远古残骸（512/256/1000），避免和毕业材料抢定位
    vein(Text.of('石英矿脉'), 'minecraft:quartz')
        .placement(320, 160, 64825185 + 27 * 7919)
        .biomeWhitelist('minecraft:is_nether')
        .id('create:vein/quartz')
    drilling([Item.of('2x minecraft:quartz')], 'create:vein/quartz', 600)
        .id('create:drilling/quartz')

    milling('4x tfc:powder/salt','tfc:ore/halite').id('create:milling/salt')

    mixing('tfc:jute_fiber', ['tfc:jute', Fluid.water(200)])
    .heated()
    .id('create:mixing/jute_fiber')

    mixing('tfc:powder/salt', Fluid.of("tfc:salt_water", 125))
    .heated()
    .id('create:mixing/salt')
    
    // tfcr高岭土 recipes removed - mod not installed
    // mixing("tfcr:roasted_kaolin_clay",["tfcr:roasted/bauxite","tfc:sand/white"])
    // .superheated()
    // .id('create:mixing/roasted_kaolin_clay')

    // 彩沙水洗成白沙，副产黏土。白沙不能再洗，否则会无限循环刷黏土
    event.custom({
        type: 'create:splashing',
        ingredients: [{tag: 'kubejs:washable_sands'}],
        results: [
            {id: 'tfc:sand/white'},
            {id: 'minecraft:clay_ball'}
        ]
    }).id('create:splashing/sand')

    // sequenced_assembly(
    //     "tfcr:raw_kaolin_clay",
    //     "tfcr:roasted_kaolin_clay",
    //     [
    //         deploying("kubejs:unfinished_raw_kaolin_clay", ["kubejs:unfinished_raw_kaolin_clay", 'tfc:metal/hammer/wrought_iron']).keepHeldItem(),
    //         pressing("kubejs:unfinished_raw_kaolin_clay","kubejs:unfinished_raw_kaolin_clay"),
    //         deploying("kubejs:unfinished_raw_kaolin_clay", ["kubejs:unfinished_raw_kaolin_clay", 'tfc:metal/hammer/wrought_iron']).keepHeldItem()
    //    ],
    //    "kubejs:unfinished_raw_kaolin_clay", 3
    // ).id('create:sequenced_assembly/raw_kaolin_clay')

    // crushing("4x tfcr:roasted/bauxite","tfcr:roasted_brick/bauxite").id('create:crushing/bauxite')

    // milling(
    //     [
    //         "tfc:kaolin_clay",
    //         "tfc:kaolin_clay"
    //     ],
    //     "tfcr:raw_kaolin_clay"
    // ).id('create:milling/raw_kaolin_clay')

    //高岭石粉自动化：窑烧只有20%概率出粉，超级加热搅拌3:1保底转化
    mixing("tfc:powder/kaolinite","3x tfc:kaolin_clay").superheated().id('create:mixing/kaolinite')

    //自动打钢
    compacting('kubejs:hot_high_carbon_steel','tfc:metal/ingot/pig_iron')
    .superheated()
    .id('create:compacting/hot_high_carbon_steel')

    sequenced_assembly(
        'tfc:metal/ingot/steel',
        'kubejs:hot_high_carbon_steel',
        [
            deploying('kubejs:unfinished_steel', ['kubejs:unfinished_steel', 'tfc:metal/hammer/steel']).keepHeldItem(),
            pressing('kubejs:unfinished_steel','kubejs:unfinished_steel'),
            deploying('kubejs:unfinished_steel', ['kubejs:unfinished_steel', 'tfc:metal/hammer/steel']).keepHeldItem()
        ],
        'kubejs:unfinished_steel', 5
    ).id('create:sequenced_assembly/steel')
        
    //自动打锻铁
    compacting('kubejs:hot_iron_bloom','tfc:raw_iron_bloom')
    .heated()
    .id('create:compacting/hot_iron_bloom')

    sequenced_assembly(
        'tfc:metal/ingot/wrought_iron',
        'kubejs:hot_iron_bloom',
        [
            deploying('kubejs:unfinished_wrought_iron', ['kubejs:unfinished_wrought_iron', 'tfc:metal/hammer/wrought_iron']).keepHeldItem(),
            pressing('kubejs:unfinished_wrought_iron','kubejs:unfinished_wrought_iron'),
            deploying('kubejs:unfinished_wrought_iron', ['kubejs:unfinished_wrought_iron', 'tfc:metal/hammer/wrought_iron']).keepHeldItem()
        ],
        'kubejs:unfinished_wrought_iron', 3
    ).id('create:sequenced_assembly/wrought_iron')

    //注液生产石英 - 已移除（AE2已删除）
    // filling("ae2:certus_quartz_crystal", [Fluid.water(1000), 'kubejs:crystal_seed_certus'])
    // .id('create:filling/certus_quartz_crystal')

    // create_new_age 已移除（电力系统换代为 Electro Energetics），钍配方随之删除

    haunting('minecraft:crying_obsidian', 'minecraft:obsidian').id('create:haunting/crying_obsidian')

    // 铁桶压板配方已删除（原版铁桶不可得，水桶走 TFC 木料配方）见 recipes/fluid_bucket_fixes.js

    //蓝图桌降配：老配方要蓝钢块（终局材料），改成木材桌面+平滑石腿，石器时代就能做
    event.remove({id: 'create:crafting/schematics/schematic_table'})
    shaped('create:schematic_table', [
        'WWW',
        ' S ',
        ' S '
    ], {
        W: '#tfc:lumber',
        S: '#c:stones/smooth'
    }).id('kubejs:crafting/schematic_table')

    //脉冲计时器紫水晶
    event.replaceInput({output:'create:pulse_timer'},'minecraft:amethyst_shard','tfc:gem/amethyst')

    //自动纺织
    mixing('8x tfc:wool_yarn','tfc:wool')
    .id('create:mixing/wool_yarn')
    
    mixing('8x firmalife:pineapple_yarn','firmalife:pineapple_fiber')
    .id('create:mixing/pineapple_yarn')

    //纺织模组已移除：textile:cotton_string 配方删除

    //安山合金
    //入门路线恢复手搓：锻铁锭拆粒+安山岩石子+石英（锻铁时代门槛保留，坩埚浇筑仍是零金属消耗的替代路线）。
    //锌粒手搓仍禁用（锌熔点低可坩埚早熔，防止铜器时代直接跳过坩埚进机械动力）；
    //搅拌配方（铁粒/锌粒两种）无门槛，造出搅拌器后即可批量生产。
    event.shaped("2x create:andesite_alloy", [
        'aba',
        'bcb',
        'aba'
    ], {
        a:"minecraft:iron_nugget",
        b:"tfc:rock/loose/andesite",
        c:"minecraft:quartz"
    }).id('create:crafting/materials/andesite_alloy')

    event.remove({id: 'create:crafting/materials/andesite_alloy_from_zinc'})

    event.replaceInput([
        {id: 'create:mixing/andesite_alloy_from_zinc'},
        {id: 'create:mixing/andesite_alloy'}
    ], "minecraft:andesite", "tfc:rock/loose/andesite")

    //搅拌配方的金属粒来源：群峦4.x没有粒这个单位，锻铁锭/锌锭一锭拆九粒
    event.shapeless('9x minecraft:iron_nugget', ['tfc:metal/ingot/wrought_iron'])
        .id('kubejs:crafting/iron_nugget_from_wrought_iron')
    event.shapeless('9x create:zinc_nugget', ['tfc:metal/ingot/zinc'])
        .id('kubejs:crafting/zinc_nugget_from_tfc_zinc')
    //反向：9粒合1锭（对齐原版1:9比例，无增值）
    event.shapeless('tfc:metal/ingot/wrought_iron', ['9x minecraft:iron_nugget'])
        .id('kubejs:crafting/wrought_iron_from_iron_nuggets')
    //黄铜粒双向转换（create黄铜压缩/分解配方因标签漏洞被封，这里补TFC安全版）
    event.shapeless('9x create:brass_nugget', ['tfc:metal/ingot/brass'])
        .id('kubejs:crafting/brass_nugget_from_tfc_brass')
    event.shapeless('tfc:metal/ingot/brass', ['9x create:brass_nugget'])
        .id('kubejs:crafting/brass_from_brass_nuggets')

    //机械手安装：板材 + 木料 → 2× 镀金属板块（板材消耗与手工 4板+锤=8块 的 1板:2块 完全一致，不多产）
    const platedMetals = [
        'bismuth', 'bismuth_bronze', 'black_bronze', 'bronze', 'brass', 'copper',
        'gold', 'nickel', 'rose_gold', 'silver', 'tin', 'zinc', 'sterling_silver',
        'wrought_iron', 'cast_iron', 'steel', 'black_steel', 'blue_steel', 'red_steel'
    ]
    platedMetals.forEach(metal => {
        event.custom({
            type: 'create:deploying',
            ingredients: [
                { tag: 'tfc:lumber' },
                { item: `tfc:metal/sheet/${metal}` }
            ],
            results: [{ count: 2, id: `tfc:metal/block/${metal}` }]
        }).id(`kubejs:deploying/plated_block_${metal}`)
    })

    event.replaceInput({mod:'create'}, "tfc:food/dried_kelp", "afc:rubber_bar")
    // 橡胶统一：原版干海带全部换成橡胶条
    event.replaceInput({mod:'create'}, "minecraft:dried_kelp", "afc:rubber_bar")
    event.replaceInput({mod:'drivebywire'}, "minecraft:dried_kelp", "afc:rubber_bar")
    event.replaceInput({mod:'rocketnautics'}, "minecraft:dried_kelp", "afc:rubber_bar")

    // 橡胶死锁修复：注液器是纸浆序列组装的前置，而它的配方在上面的全局替换里被换成了橡胶条，
    // 橡胶又要靠纸浆冲压产胶乳（其灌装步骤必须注液器）→ 第一年无解。
    // 注液器整个删掉重建（不走 replaceInput，防止链式替换静默失效）：
    // 铜机壳 + 皮革密封（TFC 兽皮加工链，石器时代就能做），
    // 其余机械（软管滑轮/电梯滑轮/传送带等）仍用橡胶，黄铜时代定位不变。
    event.remove({id: 'create:crafting/kinetics/spout'})
    event.shaped('create:spout', [
        'T',
        'P'
    ], {
        T: 'create:copper_casing',
        P: 'minecraft:leather'
    }).id('create:crafting/kinetics/spout')

    // 原版活塞：造价过低的兼容配方已移除，按整合包设定活塞不作合成获取

    event.shaped("create:elevator_pulley", [
        ' a ',
        'bbb',
        ' c '
    ], {
        a:"create:brass_casing",
        b:"afc:rubber_bar",
        c:"create:iron_sheet"
    }).id('create:crafting/kinetics/elevator_pulley')

    event.shaped("create:hose_pulley", [
        ' a ',
        'bbb',
        ' c '
    ], {
        a:"create:copper_casing",
        b:"afc:rubber_bar",
        c:"create:copper_sheet"
    }).id('create:crafting/kinetics/hose_pulley')

    pressing("create:belt_connector", "afc:rubber_bar")
    .id('create:pressing/belt_connector')

    // 泥砖鼓风烘干：湿砖坯 1:1 烘干为泥砖（与日晒产出完全一致，只是更快、可批量）。
    // 走 minecraft:smoking 配方类型，机械动力鼓风机（火焰=烟熏档）自动识别，
    // JEI 里显示在"批量烟熏"页。无经验值，不破坏泥砖经济。
    ;['fluvisol','andisol','aridisol','oxisol','alfisol','mollisol','podzol','entisol'].forEach(soil => {
        event.smoking(`tfc:mud_brick/${soil}`, `tfc:drying_bricks/${soil}`)
            .xp(0).cookingTime(200)
            .id(`kubejs:smoking/mud_brick_${soil}`)
    })

    // 煤块：9 个烟煤或褐煤在工作盆内用动力冲压机压实（褐煤热值低，允许但不赚）
    compacting("minecraft:coal_block", "9x tfc:ore/bituminous_coal")
    .id('create:compacting/coal_block')
    compacting("minecraft:coal_block", "9x tfc:ore/lignite")
    .id('create:compacting/coal_block_from_lignite')

    // 焦炭块：同样走冲压机压实，删除原版的围一圈合成
    event.remove({ id: 'immersiveengineering:crafting/coal_coke_to_coke' })
    compacting("immersiveengineering:coke", "9x immersiveengineering:coal_coke")
    .id('create:compacting/coke_block')

    // 精密构件序列组装：副产物铁锭会被OEI换成锻铁锭（白捡金属），换成铁板废料
    event.remove({ id: 'create:sequenced_assembly/precision_mechanism' })
    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": { "tag": "c:plates/gold" },
        "loops": 5,
        "results": [
            { "chance": 120.0, "id": "create:precision_mechanism" },
            { "chance": 8.0, "id": "create:golden_sheet" },
            { "chance": 8.0, "id": "create:andesite_alloy" },
            { "chance": 5.0, "id": "create:cogwheel" },
            { "chance": 3.0, "id": "minecraft:gold_nugget" },
            { "chance": 2.0, "id": "create:shaft" },
            { "chance": 2.0, "id": "create:crushed_raw_gold" },
            { "id": "create:iron_sheet" },
            { "id": "minecraft:clock" }
        ],
        "sequence": [
            {
                "type": "create:deploying",
                "ingredients": [
                    { "item": "create:incomplete_precision_mechanism" },
                    { "item": "create:cogwheel" }
                ],
                "results": [{ "id": "create:incomplete_precision_mechanism" }]
            },
            {
                "type": "create:deploying",
                "ingredients": [
                    { "item": "create:incomplete_precision_mechanism" },
                    { "item": "create:large_cogwheel" }
                ],
                "results": [{ "id": "create:incomplete_precision_mechanism" }]
            },
            {
                "type": "create:deploying",
                "ingredients": [
                    { "item": "create:incomplete_precision_mechanism" },
                    { "tag": "c:nuggets/iron" }
                ],
                "results": [{ "id": "create:incomplete_precision_mechanism" }]
            }
        ],
        "transitional_item": { "id": "create:incomplete_precision_mechanism" }
    }).id('kubejs:sequenced_assembly/precision_mechanism')

    event.custom({
        type: 'create:sequenced_assembly',
        ingredient: {tag: 'kubejs:latex_logs'},
        loops: 1,
        results: [{id: 'create:pulp'}],
        sequence: [
            {
                type: 'create:pressing',
                ingredients: [{item: 'kubejs:unfinished_pulp'}],
                results: [{id: 'kubejs:unfinished_pulp'}]
            },
            {
                type: 'create:filling',
                ingredients: [
                    {item: 'kubejs:unfinished_pulp'},
                    {type: 'neoforge:single', fluid: 'minecraft:water', amount: 200}
                ],
                results: [{id: 'kubejs:unfinished_pulp'}]
            }
        ],
        transitional_item: {id: 'kubejs:unfinished_pulp'}
    }).id('create:sequenced_assembly/pulp')

    compacting([Fluid.of('afc:latex', 200), "create:cardboard"], "create:pulp")
    .id('create:compacting/latex')

    mixing("afc:rubber_bar", ["tfc:powder/sulfur", Fluid.of('afc:latex', 200)])
    .heated()
    .id('create:mixing/rubber_bar')

    compacting("tfc:powder/sulfur", [Fluid.lava(250), "tfc:powder/charcoal"])
    .id('create:compacting/sulfur')

    // crushing(Item.of("ae2:sky_dust").withChance(0.25), "minecraft:blackstone")
    // .id('create:crushing/sky_dust')

    //水车
    shaped("create:water_wheel", [
        ' a ',
        'aba',
        ' a '
    ], {
        a:"immersiveengineering:waterwheel_segment",
        b:"create:shaft"
    }).id('create:crafting/kinetics/water_wheel')

    shaped("create:large_water_wheel", [
        ' a ',
        'aba',
        ' a '
    ], {
        a:"immersiveengineering:waterwheel_segment",
        b:"create:water_wheel"
    }).id('create:crafting/kinetics/large_water_wheel')

    //风车
    shaped("create:white_sail", [
        'aca',
        'cbc',
        'aca'
    ], {
        a:'#c:rods/wooden',
        b:"farmersdelight:canvas",
        c:'#tfc:lumber'
    }).id('create:white_sail_from_canvas')
    
    shaped("4x create:white_sail", [
        'aca',
        'cbc',
        'aca'
    ], {
        a:'#c:rods/wooden',
        b:"immersiveengineering:hemp_fabric",
        c:'#tfc:lumber'
    }).id('create:white_sail_from_hemp_fabric')
    
    shaped("8x create:white_sail", [
        'aca',
        'cbc',
        'aca'
    ], {
        a:'#c:rods/wooden',
        b:Ingredient.of([
            "tfc:wool_cloth", 
            "firmalife:pineapple_leather", 
            "tfc:burlap_cloth"
        ]),
        c:'#tfc:lumber'
    }).id('create:white_sail_from_cloth')

    crushing("4x tfcorewashing:rock_powder", "tfc:rock/cobble/andesite")
    .id('create:crushing/andesite_cobble')

    // 工程师护目镜：原版配方要玻璃块（本包没有原版玻璃），浇筑玻璃无法以物品形式获取（锯下来是玻璃板）
    // 换成TFC透镜（玻璃加工台盆吹制，玻璃工艺线产物）
    // 羊毛线和金板沿用原配方（金锭冲压金板、TFC羊毛线已进c:strings）
    event.replaceInput(
        {id: 'create:crafting/kinetics/goggles'},
        '#c:glass_blocks',
        'tfc:lens'
    )

    // 蓝图大炮降配：原配方要2个铁块+发射器（原版圆石做不了），太后期
    // 改成锻铁板+木材+安山机壳+鼓风机，进入锻铁时代就能做
    event.remove({id: 'create:crafting/schematics/schematicannon'})
    shaped('create:schematicannon', [
        ' W ',
        'LWL',
        'ABA'
    ], {
        W: 'tfc:metal/sheet/wrought_iron',
        L: '#tfc:lumber',
        A: 'create:andesite_casing',
        B: 'tfc:bellows'
    }).id('kubejs:crafting/schematicannon')

    // 原版工作台在本包无法获得，统一换成TFC工作台标签
    // 动力合成器和合成蓝图都卡在这一项
    event.replaceInput(
        {id: 'create:crafting/kinetics/mechanical_crafter'},
        'minecraft:crafting_table',
        '#tfc:workbenches'
    )
    event.replaceInput(
        {id: 'create:crafting/appliances/crafting_blueprint'},
        'minecraft:crafting_table',
        '#tfc:workbenches'
    )
})
