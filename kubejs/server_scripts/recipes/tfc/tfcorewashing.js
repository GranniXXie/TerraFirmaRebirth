ServerEvents.recipes(event => {
    const {pressing, crushing, splashing, mixing, compacting} = event.recipes.create
    const {heating} = event.recipes.tfc

    // 删除模组自带的矿团/矿砖熔化配方（数值相同但 ID 不同会并存，提示框显示两套数值）：
    // 统一由下方包内配方提供，整条链为 矿粉5 → 矿团20 → 矿砖80 mB（压缩不增值）
    event.remove({id: /^tfcorewashing:tfc\/heating\/pellet\/.*/})
    event.remove({id: /^tfcorewashing:tfc\/heating\/briquet\/.*/})

    const recipes = [
        [
            "tfcorewashing:rocky_chunks_bauxite", 
            "tfc_ie_addon:ore/rich_bauxite"
        ],
        [
            "tfcorewashing:rocky_chunks_bismuthinite",
            "tfc:ore/rich_bismuthinite"
        ],
        [
            "tfcorewashing:rocky_chunks_cassiterite",
            "tfc:ore/rich_cassiterite"
        ],
        [
            "tfcorewashing:rocky_chunks_chromite",
            "firmalife:ore/rich_chromite"
        ],
        [
            "tfcorewashing:rocky_chunks_cinnabar",
            "tfc:ore/cinnabar"
        ],
        [
            "tfcorewashing:rocky_chunks_copper",
            "tfc:ore/rich_native_copper"
        ],
        [
            "tfcorewashing:rocky_chunks_cryolite",
            "tfc:ore/cryolite"
        ],
        [
            "tfcorewashing:rocky_chunks_galena",
            "tfc_ie_addon:ore/rich_galena"
        ],
        [
            "tfcorewashing:rocky_chunks_garnierite",
            "tfc:ore/rich_garnierite"
        ],
        [
            "tfcorewashing:rocky_chunks_gold",
            "tfc:ore/rich_native_gold"
        ],
        [
            "tfcorewashing:rocky_chunks_graphite",
            "tfc:ore/graphite"
        ],
        [
            "tfcorewashing:rocky_chunks_hematite",
            "tfc:ore/rich_hematite"
        ],
        [
            "tfcorewashing:rocky_chunks_limonite",
            "tfc:ore/rich_limonite"
        ],
        [
            "tfcorewashing:rocky_chunks_magnetite",
            "tfc:ore/rich_magnetite"
        ],
        [
            "tfcorewashing:rocky_chunks_malachite",
            "tfc:ore/rich_malachite"
        ],
        [
            "tfcorewashing:rocky_chunks_silver",
            "tfc:ore/rich_native_silver"
        ],
        [
            "tfcorewashing:rocky_chunks_sphalerite",
            "tfc:ore/rich_sphalerite"
        ],
        [
            "tfcorewashing:rocky_chunks_sulfur",
            "tfc:ore/sulfur"
        ],
        [
            "tfcorewashing:rocky_chunks_tetrahedrite",
            "tfc:ore/rich_tetrahedrite"
        ],
        [
            "tfcorewashing:rocky_chunks_uraninite",
            "tfc_ie_addon:ore/rich_uraninite"
        ]
    ]

    recipes.forEach(r => {
        let [chunks, rich] = r
        if(rich.includes('rich')) {
            let [nameSpace, name] = rich.split(':ore/rich_')
            pressing(Item.of(chunks, 7), Item.of(rich))
            .id(`tfcorewashing:pressing/rich_${name}`)

            let small = rich.replace("rich", "small")
            pressing(Item.of(chunks, 2), Item.of(small))
            .id(`tfcorewashing:pressing/small_${name}`)

            let poor = rich.replace("rich", "poor")
            pressing(Item.of(chunks, 3), Item.of(poor))
            .id(`tfcorewashing:pressing/poor_${name}`)

            let normal = rich.replace("rich", "normal")
            pressing(Item.of(chunks, 5), Item.of(normal))
            .id(`tfcorewashing:pressing/normal_${name}`)
        } else {
            let [nameSpace, name] = rich.split('ore/')
            pressing(Item.of(chunks, 7), Item.of(rich))
            .id(`tfcorewashing:pressing/${name}`)
        }
    })

    const chunk_ids = [
        "bauxite",
        "bismuthinite",
        "cassiterite",
        "chromite",
        "cinnabar",
        "copper",
        "cryolite",
        "galena",
        "garnierite",
        "gold",
        "graphite",
        "hematite",
        "limonite",
        "magnetite",
        "malachite",
        "silver",
        "sphalerite",
        "sulfur",
        "tetrahedrite",
        "uraninite"
    ]

    chunk_ids.forEach(id => {
        crushing(
            [
                Item.of(`tfcorewashing:dirty_dust_${id}`), 
                `tfcorewashing:dirty_dust_${id}`
            ], 
            `tfcorewashing:chunks_${id}`
        ).id(`tfcorewashing:crushing/chunks_${id}`)
    })

    // 多石矿块的水洗配方不在此注册：由 kubejs/data/tfcorewashing/recipe/rocky_chunks/splashing/ 下的
    // 数据包配方统一提供（同名覆盖模组自带配方），产物含碎石块与低概率宝石。
    // 若在这里再注册一份，会出现两个同输入配方并存、带副产物的那个不生效的问题。

    // ===== 脏矿粉鼓风机水洗（强制重建，产物与模组自带完全一致）=====
    // 模组自带的 dirty_dust 水洗配方未生效，删后重建
    event.remove({ id: /^tfcorewashing:dirt_dusts\/splashing\/.*/ })

    // 矿物, 洗净粉, 副产沙堆
    const dirtDustWash = [
        ['bauxite',      'tfc_ie_addon:powder/bauxite',    'tfcorewashing:pile_pink_sand'],
        ['bismuthinite', 'tfc:powder/bismuthinite',        'tfcorewashing:pile_green_sand'],
        ['cassiterite',  'tfc:powder/cassiterite',         'tfcorewashing:pile_brown_sand'],
        ['chromite',     'tfcorewashing:chromium_powder',  'tfcorewashing:pile_black_sand'],
        ['cinnabar',     'minecraft:redstone',             'tfcorewashing:pile_red_sand'],
        ['copper',       'tfc:powder/native_copper',       'tfcorewashing:pile_red_sand'],
        ['cryolite',     'minecraft:redstone',             'tfcorewashing:pile_white_sand'],
        ['galena',       'tfc_ie_addon:powder/galena',     'tfcorewashing:pile_black_sand'],
        ['garnierite',   'tfc:powder/garnierite',          'tfcorewashing:pile_green_sand'],
        ['gold',         'tfc:powder/native_gold',         'tfcorewashing:pile_yellow_sand'],
        ['graphite',     'tfc:powder/graphite',            'tfcorewashing:pile_black_sand'],
        ['hematite',     'tfc:powder/hematite',            'tfcorewashing:pile_pink_sand'],
        ['limonite',     'tfc:powder/limonite',            'tfcorewashing:pile_yellow_sand'],
        ['magnetite',    'tfc:powder/magnetite',           'tfcorewashing:pile_black_sand'],
        ['malachite',    'tfc:powder/malachite',           'tfcorewashing:pile_green_sand'],
        ['silver',       'tfc:powder/native_silver',       'tfcorewashing:pile_white_sand'],
        ['sphalerite',   'tfc:powder/sphalerite',          'tfcorewashing:pile_black_sand'],
        ['sulfur',       'tfc:powder/sulfur',              'tfcorewashing:pile_yellow_sand'],
        ['tetrahedrite', 'tfc:powder/tetrahedrite',        'tfcorewashing:pile_black_sand'],
        ['uraninite',    'tfc_ie_addon:powder/uraninite',  'tfcorewashing:pile_green_sand'],
    ]

    dirtDustWash.forEach(([ore, powder, pile]) => {
        event.custom({
            type: 'create:splashing',
            ingredients: [{ item: `tfcorewashing:dirty_dust_${ore}` }],
            results: [
                { id: powder },
                { id: pile },
                { id: `tfcorewashing:dirty_pile_${ore}`, chance: 0.15 }
            ],
            processingTime: 1200
        }).id(`tfcorewashing:dirt_dusts/splashing/${ore}_dirt_dust_splashing`)
    })

    // Pellet recipes: 4x powder + water → pellet (automated mixing in basin)
    // Maps pellet ID suffix → [powder input, metal name, fluid path]
    const pelletRecipes = [
        ["bauxite",     "4x #c:ores/clean_dusts/aluminum",  "aluminum",  "tfc_ie_addon:metal/aluminum"],
        ["bismuthinite","4x #c:ores/clean_dusts/bismuth",   "bismuth",   "tfc:metal/bismuth"],
        ["cassiterite", "4x #c:ores/clean_dusts/tin",       "tin",       "tfc:metal/tin"],
        ["chromium",    "4x #c:ores/clean_dusts/chromium",  "chromium",  "firmalife:metal/chromium"],
        ["copper",      "4x tfc:powder/native_copper",      "copper",    "tfc:metal/copper"],
        ["galena",      "4x #c:ores/clean_dusts/lead",      "lead",      "tfc_ie_addon:metal/lead"],
        ["garnierite",  "4x #c:ores/clean_dusts/nickel",    "nickel",    "tfc:metal/nickel"],
        ["gold",        "4x #c:ores/clean_dusts/gold",      "gold",      "tfc:metal/gold"],
        ["hematite",    "4x tfc:powder/hematite",           "cast_iron", "tfc:metal/cast_iron"],
        ["limonite",    "4x tfc:powder/limonite",           "cast_iron", "tfc:metal/cast_iron"],
        ["magnetite",   "4x tfc:powder/magnetite",          "cast_iron", "tfc:metal/cast_iron"],
        ["malachite",   "4x tfc:powder/malachite",          "copper",    "tfc:metal/copper"],
        ["silver",      "4x #c:ores/clean_dusts/silver",    "silver",    "tfc:metal/silver"],
        ["sphalerite",  "4x #c:ores/clean_dusts/zinc",      "zinc",      "tfc:metal/zinc"],
        ["tetrahedrite","4x tfc:powder/tetrahedrite",        "copper",    "tfc:metal/copper"],
        ["uraninite",   "4x #c:ores/clean_dusts/uranium",   "uranium",   "tfc_ie_addon:metal/uranium"],
    ]

    pelletRecipes.forEach(([id, powderInput, metal, fluid]) => {
        mixing(
            `tfcorewashing:pellet_${id}`,
            [powderInput, Fluid.water(250)]
        ).id(`tfcorewashing:mixing/pellet_${id}`)

        // Briquet: 4x pellet 压块机压缩 → briquet（与手工合成 4→1 完全等价，不吃助焊剂/水）
        compacting(
            `tfcorewashing:briquet_${id}`,
            `4x tfcorewashing:pellet_${id}`
        ).id(`tfcorewashing:compacting/briquet_${id}`)

        // TFC heating: pellet → metal fluid (20 mB = 4×矿粉的5mB，压缩不增值)
        heating(`tfcorewashing:pellet_${id}`, metal_temperature[metal])
        .resultFluid(Fluid.of(fluid, 20))
        .id(`tfcorewashing:heating/pellet_${id}`)

        // TFC heating: briquet → metal fluid (80 mB = 4×矿团，5-20-80 等比链)
        heating(`tfcorewashing:briquet_${id}`, metal_temperature[metal])
        .resultFluid(Fluid.of(fluid, 80))
        .id(`tfcorewashing:heating/briquet_${id}`)
    })
})
