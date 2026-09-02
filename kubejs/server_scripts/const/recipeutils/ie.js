// priority: 100

/**
 * 
 * @param {Ingredient_} ingredient 
 * @returns {Internal.JsonObject_}
 */
function sizeIngredient(ingredient) {
    // 已经是完整 IE 配料结构的直接透传（比如 pureIngot 生成的）
    if (typeof ingredient === 'object' && ingredient !== null && !Array.isArray(ingredient) && ingredient.basePredicate) {
        return ingredient
    }
    // InputItem no longer exists in KubeJS 1.21
    if(typeof ingredient === 'string' && ingredient.match(/^(\d+)x\s/)) {
        let count = parseInt(ingredient.match(/^(\d+)x\s/)[1])
        let item = ingredient.replace(/^\d+x\s/, '')
        return {"count": count, "basePredicate": Ingredient.of(item).toJson()}
    }
    return {"count": 1, "basePredicate": Ingredient.of(ingredient).toJson()}
}

/**
 * 生成"仅纯净锭"的 IE 配料：劣等合金锭与正常锭同 id，靠 inferior_origin 组件区分，
 * 用差集把带组件的排除掉，防止劣等金属混进工业合金产线
 * @param {number} count
 * @param {string} itemId 锭的物品 id
 * @param {string} baseMetal 劣等组件里的基体金属名
 * @returns {Internal.JsonObject_}
 */
function pureIngot(count, itemId, baseMetal) {
    return {
        "count": count,
        "basePredicate": {
            "type": "neoforge:difference",
            "base": {"item": itemId},
            "subtracted": {
                "type": "neoforge:components",
                "items": [itemId],
                "components": {"tfc_alloy_ext:inferior_origin": {"base_metal": baseMetal}}
            }
        }
    }
}

/**
 * 
 * @param {string} fluidTag 
 * @param {number} amount 
 * @returns {Internal.JsonObject_}
 */
function fluidTag(fluidTag, amount) {
    if(fluidTag.includes('#')){
        return {"amount":amount, "tag":fluidTag.slice(1)}
    } 
    return {"amount":amount, "tag":fluidTag}
}

/**
 * 
 * @param {Internal.ItemStack_[]} results 
 * @param {Ingredient_} input 
 * @param {Ingredient_[]?} additives 
 * @param {number?} time 
 * @param {number?} energy 
 * @param {boolean?} slag 
 * @returns {Internal.JsonObject_}
 */
function arc_furnace_json(results, input, additives, time, energy, slag) {
    results = Array.isArray(results)? results: [results]
    let data = {
        "type": "immersiveengineering:arc_furnace",
        "results": results.map(r => Item.of(r).toJson()),
        "input": sizeIngredient(input),
        "additives": [],
        "time": 200,
        "energy": 5000
    }

    if(additives) {
        additives = Array.isArray(additives)? additives: [additives]
        data.additives = additives.map(a => sizeIngredient(a))
    }

    if(time) {
        data.time = time
    }

    if(energy) {
        data.energy = energy
    }

    if(slag) {
        data.slag = {"tag":"c:slag"}
    }

    return data
}

/**
 * 
 * @param {Internal.ItemStack_} result 
 * @param {Ingredient_} input 
 * @param {string} mold 
 * @param {number?} energy 
 * @returns {Internal.JsonObject_}
 */
function metal_press_json(result, input, mold, energy) {
    let data = {
        "type":"immersiveengineering:metal_press",
        "energy": 3200,
        "input":sizeIngredient(input),
        "mold":mold,
        "result":Item.of(result).toJson()
    }

    if(energy) {
        data.energy = energy
    }

    return data
}

/**
 * 
 * @param {Internal.FluidStack_} result 
 * @param {Internal.JsonObject_} input0 
 * @param {Internal.JsonObject_} input1 
 * @param {Ingredient_} catalyst 
 * @param {number} energy 
 * @returns {Internal.JsonObject_}
 */
function refinery_json(result, input0, input1, catalyst, energy) {
    let data = {
        "type":"immersiveengineering:refinery",
        "catalyst":Ingredient.of(catalyst).toJson(),
        "energy": energy,
        "input0":input0,
        "input1":input1,
        "result":Fluid.of(result).toJson()
    }

    return data
}

/**
 * 
 * @param {Internal.ItemStack_} result 
 * @param {Ingredient_} input 
 * @param {number} energy 
 * @returns {Internal.JsonObject_}
 */
function squeezer_json(result, input, energy) {
    let data = {
        "type":"immersiveengineering:squeezer",
        "energy":energy,
        "input":sizeIngredient(input),
        "result":Item.of(result).toJson()
    }

    return data
}

/**
 * 
 * @param {Internal.ItemStack_[]} results 
 * @param {Ingredient_} input 
 * @param {Ingredient_} soil 
 * @param {number} time 
 * @param {string} renderBlockId 
 * @param {"crop" | "stacking"} renderType 
 * @returns {Internal.JsonObject_}
 */
function cloche_json(results, input, soil, time, renderBlockId, renderType) {
    results = Array.isArray(results)? results: [results]
    let data = {
        "type": "immersiveengineering:cloche",
        "results": results.map(r => Item.of(r).toJson()),
        "input": Ingredient.of(input).toJson(),
        "soil": Ingredient.of(soil).toJson(),
        "time": time,
        "render": {"type": "immersiveengineering:crop", "block": renderBlockId}
    }

    if(renderType) {
        data.render = {"type": renderType.includes(':') ? renderType : "immersiveengineering:" + renderType, "block": renderBlockId}
    }

    return data
}

/**
 * 
 * @param {object} result sizeIngredient(ingredient)
 * @param {Ingredient_} input 
 * @param {object[]?} secondaries 
 * @param {number} energy 
 * @returns {Internal.JsonObject_}
 */
function crusher_json(result, input, secondaries, energy) {
    let data = {
        "type": "immersiveengineering:crusher",
        "energy": 54000,
        "input": Ingredient.of(input).toJson(),
        "result": Item.of(result).toJson(),
        "secondaries": []
    }

    if(secondaries) {
        secondaries = Array.isArray(secondaries)? secondaries: [secondaries]
        data.secondaries = secondaries
    }

    if(energy) {
        data.energy = energy
    }

    return data
}
