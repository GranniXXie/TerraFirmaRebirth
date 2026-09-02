ServerEvents.recipes(event => {

    const preId = 'immersiveengineering:crusher/'

    /**
     * 
     * @param {object} result sizeIngredient(ingredient)
     * @param {Ingredient_} input 
     * @param {number?} energy 54000
     * @param {object[]?} secondaries 
     * @returns {Internal.RecipeJS_}
     */
    function crusher(result, input, energy, secondaries) {
        return event.custom(crusher_json(result, input, secondaries, energy))
    }

    // crusher("ae2:sky_dust", "minecraft:blackstone").id(preId + 'sky_dust')
})
