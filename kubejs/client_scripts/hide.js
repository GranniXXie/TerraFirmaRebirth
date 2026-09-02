// 注：KubeJS 1.21 中 RecipeViewerEvents.hideItems 已移除
// 如需隐藏 JEI 物品，请在 server_scripts 中使用 RecipeViewerEvents.removeEntries
// 或等待 KubeJS JEI 集成更新
/*
RecipeViewerEvents.removeEntries(event => {
    const items = [
        "create_connected:crank_wheel",
        "create_connected:large_crank_wheel",
        /create:.*_valve_handle/,

        "waterflasks:unfinished_red_steel_flask",
        "waterflasks:red_steel_flask",

        "createutilities:gearcube",

        'cookingforblockheads:tool_rack',
        'cookingforblockheads:toaster',
        'cookingforblockheads:milk_jar',
        'cookingforblockheads:cow_jar',
        'cookingforblockheads:spice_rack',
        'cookingforblockheads:fruit_basket',
        'cookingforblockheads:cooking_table',
        'cookingforblockheads:fridge',
        'cookingforblockheads:counter',
        'cookingforblockheads:cabinet',
        'cookingforblockheads:corner',
        'cookingforblockheads:hanging_corner',
        /cookingforblockheads:.*_kitchen_floor/,
        /cookingforblockheads:.*oven/,
        'cookingforblockheads:recipe_book',
        'cookingforblockheads:no_filter_edition',
        'cookingforblockheads:crafting_book',
        'cookingforblockheads:heating_unit',
        'cookingforblockheads:ice_unit',
        'cookingforblockheads:preservation_chamber',

        "constructionwand:stone_wand",
        "constructionwand:iron_wand",
        "constructionwand:core_angel",
        "constructionwand:core_destruction"
    ]

    items.forEach(item => {
        event.remove(item)
    })
})
*/
