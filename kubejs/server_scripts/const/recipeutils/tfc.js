/**
 * 要求食材未腐烂（tfc:not_rotten），包在普通材料外面用
 * @param {Ingredient} ingredient
 * @returns
 */
function notRotten(ingredient) {
    return TFC.ingredient.notRotten().and(ingredient)
}
