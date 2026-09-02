ServerEvents.recipes(event => {
    
    /**
     * 
     * @param {OutputItem_} result 
     * @param {Ingredient[]} ingredients 
     * @param {Ingredient?} container 
     * @param {number?} cookingtime 100
     * @param {number?} experience 1.0
     * @returns {Internal.RecipeJS_}
     */
    function cooking(result, ingredients, container, cookingtime, experience) {
        return event.custom(cooking_json(result, ingredients, container, cookingtime, experience))
    }
    
    // tfcr items removed - mod not installed
    // cooking(
    //     "tfcr:powdered_fruit", 
    //     [
    //         "#tfc:sweetener",
    //         notRotten("#tfc:foods/fruits")
    //     ], 
    //     false, 0.35
    // ).id('farmersdelight:cooking/powdered_fruit')

    // cooking(
    //     "tfcr:powdered_vegetable", 
    //     [
    //         "#tfc:sweetener",
    //         notRotten("#tfc:foods/vegetables")
    //     ], false, 0.35
    // ).id('farmersdelight:cooking/powdered_vegetable')

    // cooking(
    //     "tfcr:powdered_meat", 
    //     [
    //         "tfc:powder/salt",
    //         notRotten("#tfc:foods/raw_meats")
    //     ], false, 0.35
    // ).id('farmersdelight:cooking/powdered_meat')
})
