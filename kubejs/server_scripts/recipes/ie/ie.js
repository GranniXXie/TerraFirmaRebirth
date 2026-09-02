ServerEvents.recipes(event => {

    const {shaped, shapeless} = event.recipes.kubejs

    // 铜导线造价对齐CEE：CEE是3铜粒=1根（1/3锭），IE原配方1铜板=1根（1锭）差了3倍
    // 改成1铜板剪出2根（1/2锭），比CEE略贵一点，轧线机1锭出2根不变
    event.remove({id: 'immersiveengineering:crafting/wire_copper'})
    shapeless('2x immersiveengineering:wire_copper', [
        '#c:plates/copper',
        'immersiveengineering:wirecutter'
    ]).damageIngredient({item: 'immersiveengineering:wirecutter'}, 1)
    .id('kubejs:crafting/wire_copper')

    event.replaceInput(
        {id: 'tfc_ie_addon:crafting/blueprint_electrode'}, 
        "tfc:metal/ingot/blue_steel", 
        "tfc:metal/ingot/black_steel"
    )

    event.replaceInput(
        {id: 'tfc_ie_addon:crafting/blueprint_special_bullet'}, 
        "tfc:metal/ingot/blue_steel", 
        "tfc:metal/ingot/black_steel"
    )

    event.replaceInput(
        {id: 'immersiveengineering:crafting/watermill'}, 
        "tfc:metal/ingot/steel",
        "tfc:metal/ingot/wrought_iron"
    )

    shaped("immersiveengineering:coil_lv", [
        ' a ',
        'aba',
        ' a '
    ], {
        a:"immersiveengineering:wirecoil_copper",
        b:"tfc:metal/ingot/wrought_iron"
    }).id('immersiveengineering:crafting/coil_lv')

    shaped("immersiveengineering:thermoelectric_generator", [
        'aba',
        'cdc',
        'ccc'
    ], {
        a:"tfc:metal/ingot/wrought_iron",
        b:"tfc:metal/ingot/steel",
        c:"create:brass_sheet",
        d:"immersiveengineering:coil_lv"
    }).id('immersiveengineering:crafting/thermoelectric_generator')

    event.replaceInput({id: 'immersiveengineering:crafting/light_engineering'}, "immersiveengineering:sheetmetal_iron", "immersiveengineering:sheetmetal_aluminum")

    event.replaceInput({id: 'immersiveengineering:crafting/heavy_engineering'}, "immersiveengineering:sheetmetal_steel", "immersiveengineering:sheetmetal_iron")

    // TFC.ingredient.fluid() no longer exists in KubeJSTFC 1.21
    // Replacing with a bucket of biodiesel as approximation
    shaped("4x immersiveengineering:sheetmetal_steel", [
        ' a ',
        'aba',
        ' a '
    ], {
        a:"immersiveengineering:plate_steel",
        b:"immersiveengineering:fluid_pipe"
    }).id('immersiveengineering:crafting/sheetmetal_steel')
})
