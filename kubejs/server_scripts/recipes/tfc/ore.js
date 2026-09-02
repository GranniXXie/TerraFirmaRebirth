ServerEvents.recipes(event => {
    const {heating, quern} = event.recipes.tfc
    const {milling} = event.recipes.create

    // 删掉官方矿石加热配方，统一走下方包内 10/20/30 梯度
    // （官方为 15/25/35，与 KJS 配方 id 不同会并存，生效哪个取决于加载顺序）
    const tfcOreNames = ['hematite','bismuthinite','cassiterite','garnierite','limonite','magnetite','malachite','native_copper','native_gold','native_silver','sphalerite','tetrahedrite']
    tfcOreNames.forEach(ore => {
        ['poor','normal','rich'].forEach(grade => {
            event.remove({id: `tfc:heating/ore/${grade}_${ore}`})
        })
    })
    ;['poor','normal','rich'].forEach(grade => {
        event.remove({id: `firmalife:heating/ore/${grade}_chromite`})
        event.remove({id: `tfc_ie_addon:heating/ore/${grade}_bauxite`})
        event.remove({id: `tfc_ie_addon:heating/ore/${grade}_galena`})
        event.remove({id: `tfc_ie_addon:heating/ore/${grade}_uraninite`})
    })

    //原矿可熔
    const tfc_ore_heating_recipes = [
        [
            'hematite', 'cast_iron'
        ],
        [
            'bismuthinite', 'bismuth'
        ],
        [
            'cassiterite', 'tin'
        ],
        [
            'garnierite', 'nickel'
        ],
        [
            'limonite', 'cast_iron'
        ],
        [
            'magnetite', 'cast_iron'
        ],
        [
            'malachite', 'copper'
        ],
        [
            'native_copper', 'copper'
        ],
        [
            'native_gold', 'gold'
        ],
        [
            'native_silver', 'silver'
        ],
        [
            'sphalerite', 'zinc'
        ],
        [
            'tetrahedrite', 'copper'
        ]
    ]

    /**
     * 
     * @param {"poor" | "normal" | "rich"} type 
     * @returns 
     */
    function getOtherOreHeatingRecipes(type) {
        let recipes = [
            [
                `firmalife:ore/${type}_chromite`, 'firmalife:metal/chromium', 'chromium'
            ],
            [
                `tfc_ie_addon:ore/${type}_bauxite`, 'tfc_ie_addon:metal/aluminum', 'aluminum'
            ],
            [
                `tfc_ie_addon:ore/${type}_galena`, 'tfc_ie_addon:metal/lead', 'lead'
            ],
            [
                `tfc_ie_addon:ore/${type}_uraninite`, 'tfc_ie_addon:metal/uranium', 'uranium'
            ]
        ]
        return recipes
    }

    tfc_ore_heating_recipes.forEach(arr => {
        heating(`tfc:ore/poor_${arr[0]}`, metal_temperature[arr[1]])
        .resultFluid(Fluid.of(`tfc:metal/${arr[1]}`, 10))
        .id(`tfc:ore/heating/poor_${arr[0]}`)

        heating(`tfc:ore/normal_${arr[0]}`, metal_temperature[arr[1]])
        .resultFluid(Fluid.of(`tfc:metal/${arr[1]}`, 20))
        .id(`tfc:ore/heating/normal_${arr[0]}`)
        
        heating(`tfc:ore/rich_${arr[0]}`, metal_temperature[arr[1]])
        .resultFluid(Fluid.of(`tfc:metal/${arr[1]}`, 30))
        .id(`tfc:ore/heating/rich_${arr[0]}`)
    })

    getOtherOreHeatingRecipes("normal").forEach(arr => {
        heating(Item.of(arr[0]), metal_temperature[arr[2]])
        .resultFluid(Fluid.of(arr[1], 20))
        .id(`tfc:ore/heating/normal/${arr[2]}`)
    })

    getOtherOreHeatingRecipes("poor").forEach(arr => {
        heating(arr[0], metal_temperature[arr[2]])
        .resultFluid(Fluid.of(arr[1], 10))
        .id(`tfc:ore/heating/poor/${arr[2]}`)
    })

    getOtherOreHeatingRecipes("rich").forEach(arr => {
        heating(arr[0], metal_temperature[arr[2]])
        .resultFluid(Fluid.of(arr[1], 30))
        .id(`tfc:ore/heating/rich/${arr[2]}`)
    })

    // 矿石直接成粉末
    const tfc_milling_recipes = [
        'hematite',
        'bismuthinite',
        'cassiterite',
        'garnierite',
        'limonite',
        'magnetite',
        'malachite',
        'native_copper',
        'native_gold',
        'native_silver',
        'sphalerite',
        'tetrahedrite'
    ]
    /**
     * 
     * @param {"small" | "poor" | "normal" | "rich"} type 
     * @returns 
     */
    function getOtherOreMillingRecipes(type) {
        let recipes = [
            [
                `firmalife:ore/${type}_chromite`, "tfcorewashing:chromium_powder", 'chromium', type
            ],
            [
                `tfc_ie_addon:ore/${type}_bauxite`, "tfc_ie_addon:powder/bauxite", 'aluminum', type
            ],
            [
                `tfc_ie_addon:ore/${type}_galena`, "tfc_ie_addon:powder/galena", 'lead', type
            ],
            [
                `tfc_ie_addon:ore/${type}_uraninite`, "tfc_ie_addon:powder/uraninite", 'uranium', type
            ]
        ]
        return recipes
    }

    tfc_milling_recipes.forEach(r => {
        quern(`tfc:powder/${r}`, `tfc:ore/small_${r}`).id(`tfc:ore/quern/small_${r}`)
        quern(`2x tfc:powder/${r}`, `tfc:ore/poor_${r}`).id(`tfc:ore/quern/poor_${r}`)
        quern(`4x tfc:powder/${r}`, `tfc:ore/normal_${r}`).id(`tfc:ore/quern/normal_${r}`)
        quern(`6x tfc:powder/${r}`, `tfc:ore/rich_${r}`).id(`tfc:ore/quern/rich_${r}`)
        
        milling(`tfc:powder/${r}`, `tfc:ore/small_${r}`).id(`tfc:ore/milling/small_${r}`)
        milling(`2x tfc:powder/${r}`, `tfc:ore/poor_${r}`).id(`tfc:ore/milling/poor_${r}`)
        milling(`4x tfc:powder/${r}`, `tfc:ore/normal_${r}`).id(`tfc:ore/milling/normal_${r}`)
        milling(`6x tfc:powder/${r}`, `tfc:ore/rich_${r}`).id(`tfc:ore/milling/rich_${r}`)
    })

    getOtherOreMillingRecipes("small").forEach(arr => {
        quern(Item.of(arr[1]), arr[0]).id(`tfc:ore/quern/${arr[3]}_${arr[2]}`)
        milling(Item.of(arr[1]), arr[0]).id(`tfc:ore/milling/${arr[3]}_${arr[2]}`)
    })
    
    getOtherOreMillingRecipes("poor").forEach(arr => {
        quern(Item.of(arr[1], 2), arr[0]).id(`tfc:ore/quern/${arr[3]}_${arr[2]}`)
        milling(Item.of(arr[1], 2), arr[0]).id(`tfc:ore/milling/${arr[3]}_${arr[2]}`)
    })
    
    getOtherOreMillingRecipes("normal").forEach(arr => {
        quern(Item.of(arr[1], 4), arr[0]).id(`tfc:ore/quern/${arr[3]}_${arr[2]}`)
        milling(Item.of(arr[1], 4), arr[0]).id(`tfc:ore/milling/${arr[3]}_${arr[2]}`)
    })
    
    getOtherOreMillingRecipes("rich").forEach(arr => {
        quern(Item.of(arr[1], 6), arr[0]).id(`tfc:ore/quern/${arr[3]}_${arr[2]}`)
        milling(Item.of(arr[1], 6), arr[0]).id(`tfc:ore/milling/${arr[3]}_${arr[2]}`)
    })
})