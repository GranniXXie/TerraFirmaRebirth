ServerEvents.recipes(event => {
    /**
     * 
     * @param {Internal.ItemStack_[]} result 
     * @param {Ingredient_[]} ingredients 
     * @param {"axe_dig" | "pickaxe_dig" | Ingredient_} tool 
     * @returns {Internal.RecipeJS_}
     */
    function cutting(result, ingredients, tool) {
        return event.custom(cutting_json(result, ingredients, tool))
    }

    //砧板拆IE石英块
    cutting("4x minecraft:quartz", 'tfc_ie_addon:mineral/quartz_block', "pickaxe_dig")
    .id('farmersdelight:cutting/quartz')

})