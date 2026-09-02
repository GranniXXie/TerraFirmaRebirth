ServerEvents.recipes(event => {

    /**
     * 
     * @param {Internal.FluidStack_} result 
     * @param {Internal.JsonObject_} input0 
     * @param {Internal.JsonObject_} input1 
     * @param {Ingredient_} catalyst 
     * @param {number} energy 
     * @returns {Internal.RecipeJS_}
     */
    function refinery(result, input0, input1, catalyst, energy) {
        return event.custom(refinery_json(result, input0, input1, catalyst, energy))
    }

    /**
     * 
     * @param {Internal.ItemStack_} result 
     * @param {Ingredient_} input 
     * @param {number} energy 
     * @returns {Internal.RecipeJS_}
     */
    function squeezer(result, input, energy) {
        return event.custom(squeezer_json(result, input, energy))
    }

    //生物柴油倍率20
    const n = 20

    refinery(
        Fluid.of("immersiveengineering:biodiesel", 16*n),
        fluidTag("#c:plantoil", 8),
        fluidTag("#c:ethanol", 8),
        "#c:dusts/saltpeter",
        80*n
    ).id('immersiveengineering:refinery/biodiesel')

    //甘蔗乙醇恢复 3.4 的 200mB（1.21 上游统一砍成 80mB，此处对齐 3.4：甘蔗是高级乙醇作物）
    event.custom({
        type: 'immersiveengineering:fermenter',
        energy: 6400,
        fluid: { amount: 200, id: 'immersiveengineering:ethanol' },
        input: { item: 'tfc:food/sugarcane' }
    }).id('tfc_ie_addon:fermenter/sugarcane')

    //高定向热解石墨：木炭粉路线（id 之前误写成 biodiesel，修正）
    squeezer(
        "immersiveengineering:dust_hop_graphite",
        "32x tfc:powder/charcoal",
        19200
    ).id('kubejs:squeezer/hop_graphite_from_charcoal')

    //高定向热解石墨：石墨粉路线（对齐焦煤粉的8:1）
    squeezer(
        "immersiveengineering:dust_hop_graphite",
        "8x tfc:powder/graphite",
        19200
    ).id('kubejs:squeezer/hop_graphite_from_graphite')
})