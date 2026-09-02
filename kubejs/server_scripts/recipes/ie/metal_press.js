ServerEvents.recipes(event => {

    const preId = 'immersiveengineering:metal_press/'

    /**
     * 
     * @param {Internal.ItemStack_} result 
     * @param {Ingredient_} input 
     * @param {string} mold 
     * @param {number?} energy 
     * @returns {Internal.RecipeJS_}
     */
    function metal_press(result, input, mold, energy) {
        return event.custom(metal_press_json(result, input, mold, energy))
    }

    metal_press('tfc:ceramic/unfired_brick', "minecraft:clay_ball", 'tfc:ceramic/ingot_mold')
    .id(preId + 'unfired_brick')
    
    metal_press('tfc:ceramic/unfired_brick', "minecraft:clay_ball", 'tfc:ceramic/fire_ingot_mold')
    .id(preId + 'unfired_brick_1')

    metal_press("tfc:ceramic/unfired_fire_brick", "tfc:fire_clay", 'tfc:ceramic/ingot_mold')
    .id(preId + 'unfired_fire_brick')
    
    metal_press("tfc:ceramic/unfired_fire_brick", "tfc:fire_clay", 'tfc:ceramic/fire_ingot_mold')
    .id(preId + 'unfired_fire_brick_1')

    //自动黄铜构件
    metal_press('2x tfc:brass_mechanisms', "#c:ingots/brass", "immersiveengineering:mold_gear", 2400)
    .id('ie:metal_press/brass_mechanisms')

    const tfc_metals = [
        'bismuth',
        "bismuth_bronze",
        "black_bronze",
        "bronze",
        "brass",
        "copper",
        "gold",
        "nickel",
        "rose_gold",
        "silver",
        "tin",
        "zinc",
        "sterling_silver",
        "wrought_iron",
        "cast_iron",
        "steel",
        "black_steel",
        "blue_steel",
        "red_steel"
    ]

    const other_metals = [
        ["firmalife", "chromium"],
        ["firmalife", "stainless_steel"]
        // survivorsaquaculture 模组不在包内，已删除 neptunium/neptunian_steel
    ]

    tfc_metals.forEach(id => {
        metal_press(
            `tfc:metal/double_sheet/${id}`, 
            `2x tfc:metal/sheet/${id}`, 
            "tfc_ie_addon:mold_sheet"
        ).id(`${preId}${id}_sheet_to_double_sheet`)
    })

    other_metals.forEach(metal => {
        metal_press(
            `${metal[0]}:metal/double_sheet/${metal[1]}`, 
            `2x ${metal[0]}:metal/sheet/${metal[1]}`, 
            "tfc_ie_addon:mold_sheet"
        ).id(`${preId}${metal[1]}_sheet_to_double_sheet`)
    })

    //杆：1锭压2杆（杆模具），不用在铁砧上一个个手打
    tfc_metals.forEach(id => {
        metal_press(
            `2x tfc:metal/rod/${id}`,
            `tfc:metal/ingot/${id}`,
            "immersiveengineering:mold_rod",
            2400
        ).id(`${preId}rod_${id}`)
    })

    other_metals.forEach(metal => {
        metal_press(
            `2x ${metal[0]}:metal/rod/${metal[1]}`,
            `${metal[0]}:metal/ingot/${metal[1]}`,
            "immersiveengineering:mold_rod",
            2400
        ).id(`${preId}rod_${metal[1]}`)
    })
})