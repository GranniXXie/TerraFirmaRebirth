// priority: 100

/**
 * 
 * @param {Internal.ItemStack_[]} result 
 * @param {Ingredient_[]} ingredients 
 * @param {"axe_dig" | "pickaxe_dig" | Ingredient_} tool 
 * @returns {Internal.JsonObject_}
 */
function cutting_json(result, ingredients, tool) {
    result = Array.isArray(result)? result: [result]
    ingredients = Array.isArray(ingredients)? ingredients: [ingredients]
    let data = {
        "type": "farmersdelight:cutting",
        "ingredients": ingredients.map(i => Ingredient.of(i).toJson()),
        // FD 1.21: 每个产出要再包一层 "item"
        "result": result.map(o => ({"item": Item.of(o).toJson()}))
    }

    switch (tool) {
        case "axe_dig":
            // FD 1.21: tool_action 序列化器已删除，改用 item_ability；sound 需为对象
            data.tool = [{"type": "farmersdelight:item_ability", "action": "axe_dig"}]
            data.sound = {"sound_id": "minecraft:item.axe.strip"}
            break
        case "pickaxe_dig":
            data.tool = [{"type": "farmersdelight:item_ability", "action": "pickaxe_dig"}]
            break
        default:
            data.tool = [Ingredient.of(tool).toJson()]
            break
    }

    return data
}

/**
 * 
 * @param {OutputItem_} result 
 * @param {Ingredient[]} ingredients 
 * @param {Ingredient?} container 
 * @param {number?} cookingtime 100
 * @param {number?} experience 1.0
 * @returns {Internal.JsonObject_}
 */
function cooking_json(result, ingredients, container, cookingtime, experience) {
    ingredients = Array.isArray(ingredients)? ingredients: [ingredients]
    let data = {
        "type": "farmersdelight:cooking",
        "experience": 1.0,
        "cookingtime": 100,
        "ingredients": ingredients.map(i => Ingredient.of(i).toJson()),
        "result": Item.of(result).toJson()
    }
    if(cookingtime) {
        data.cookingtime = cookingtime
    }
    if(experience) {
        data.experience = experience
    }
    if(container) {
        data.container = Item.of(container).toJson()
    }

    return data
}