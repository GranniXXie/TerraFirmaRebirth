//沃土加速,暂定0.8
ServerEvents.recipes(event => {
    const time = 12800*0.8
    const rich_soil = 'farmersdelight:rich_soil'
    const preId = 'immersiveengineering:cloche/'

    /**
     * 
     * @param {Internal.ItemStack_[]} results 
     * @param {Ingredient_} input 
     * @param {Ingredient_} soil 
     * @param {number} time 
     * @param {string} renderBlockId 
     * @param {"crop" | "stacking"} renderType 
     * @returns {Internal.RecipeJS_}
     */
    function cloche(results, input, soil, time, renderBlockId, renderType) {
        return event.custom(cloche_json(results, input, soil, time, renderBlockId, renderType))
    }

    //批量注册配方
    //results, input, renderBlockId, featureId
    const recipes = [
        [
            "tfc:food/wheat", "tfc:seeds/wheat", "tfc:crop/wheat", 'wheat'
        ],
        [
            "tfc:food/tomato", "tfc:seeds/tomato", "tfc:crop/tomato", 'tomato'
        ],
        [
            "tfc:food/sugarcane", "tfc:seeds/sugarcane", "tfc:crop/sugarcane", 'sugarcane'
        ],
        [
            "tfc:food/squash", "tfc:seeds/squash", "tfc:crop/squash", 'squash'
        ],
        [
            "tfc:food/soybean", "tfc:seeds/soybean", "tfc:crop/soybean", 'soybean'
        ],
        [
            "tfc:food/rye", "tfc:seeds/rye", "tfc:crop/rye", 'rye'
        ],
        [
            "tfc:food/rice", "tfc:seeds/rice", "tfc:crop/rice", 'rice'
        ],
        [
            "tfc:pumpkin", "tfc:seeds/pumpkin", "tfc:crop/pumpkin", 'pumpkin'
        ],
        [
            "tfc:food/potato", "tfc:seeds/potato", "tfc:crop/potato", 'potato'
        ],
        [
            "tfc:food/onion", "tfc:seeds/onion", "tfc:crop/onion", 'onion'
        ],
        [
            "tfc:food/oat", "tfc:seeds/oat", "tfc:crop/oat", 'oat'
        ],
        [
            "tfc:melon", "tfc:seeds/melon", "tfc:crop/melon", 'melon'
        ],
        [
            "tfc:food/maize", "tfc:seeds/maize", "tfc:crop/maize", 'maize'
        ],
        [
            "tfc:jute", "tfc:seeds/jute", "tfc:crop/jute", 'jute'
        ],
        [
            "tfc:food/green_bean", "tfc:seeds/green_bean", "tfc:crop/green_bean", 'green_bean'
        ],
        [
            "tfc:food/garlic", "tfc:seeds/garlic", "tfc:crop/garlic", 'garlic'
        ],
        [
            "tfc:food/carrot", "tfc:seeds/carrot", "tfc:crop/carrot", 'carrot'
        ],
        [
            "tfc:food/cabbage", "tfc:seeds/cabbage", "tfc:crop/cabbage", 'cabbage'
        ],
        [
            "tfc:food/beet", "tfc:seeds/beet", "tfc:crop/beet", 'beet'
        ],
        [
            "tfc:food/barley", "tfc:seeds/barley", "tfc:crop/barley", 'barley'
        ]
    ]

    recipes.forEach(r => {
        cloche(
            [ Item.of(r[0], 2), r[1] ],
            r[1],
            rich_soil,
            time,
            r[2]
        ).id(preId + r[3])
    })

    cloche("3x minecraft:bamboo", "minecraft:bamboo", rich_soil, 200, "minecraft:bamboo", "stacking")
    .id(preId + 'bamboo')

    cloche(["2x immersiveengineering:hemp_fiber", "immersiveengineering:seed"], "immersiveengineering:seed", rich_soil, 4000, "immersiveengineering:hemp")
    .id(preId + 'hemp')
})
