ServerEvents.recipes(event => {
    event.replaceInput({mod: 'pipez'}, "tfc:metal/ingot/wrought_iron", "tfc:metal/ingot/steel")
    // pipez nugget配方已移除（依赖MEK）
    // event.replaceInput({mod: 'pipez'}, "minecraft:iron_nugget", "mekanism:nugget_steel")
})
