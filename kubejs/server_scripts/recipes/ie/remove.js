ServerEvents.recipes(event => {
    const ids = [
        'tfc_ie_addon:arc_furnace/wrought_iron',

        /immersiveengineering\:crafting\/raw_hammercrushing_/,
        /immersiveengineering\:crafting\/hammercrushing_/,
        'immersiveengineering:crafting/paper_from_sawdust',

        // 9锭压1块的模具压块配方：TFC金属块设计上只值100mb（薄板路线4板出8块），压出来血亏800mb，删掉
        'tfc_ie_addon:metalpress/block_steel',
        'tfc_ie_addon:metalpress/block_uranium',
        // 压块模具只服务上面两条配方，一并删掉并在JEI隐藏
        'tfc_ie_addon:blueprint/mold_block',

        // 原版种子的挤压机植物油配方：群峦世界拿不到原版种子，植物油走 tfc_ie_addon 的群峦种子配方（23种）
        // 工业大麻籽保留：大麻可以通过发酵罐/温室种植，配方有效
        'immersiveengineering:squeezer/wheat_seeds',
        'immersiveengineering:squeezer/beetroot_seeds',
        'immersiveengineering:squeezer/melon_seeds',
        'immersiveengineering:squeezer/pumpkin_seeds'
    ]
    ids.forEach(id => {
        event.remove({id: id})
    })
})