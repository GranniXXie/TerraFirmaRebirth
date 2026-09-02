ServerEvents.recipes(event => {
    const ids = [
        "artisanal:vat/perishable_sugar",
        'artisanal:crafting/animal_fat',

        // 菠萝纤维改回官方链：鲜菠萝烘干→干菠萝（永不腐烂食品），干菠萝+小刀→纤维
        // 删除的是 firmalife:drying/pineapple_fiber（鲜菠萝直接烘干成纤维的捷径，与干果配方冲突）
        'firmalife:drying/pineapple_fiber',

        'tfcbetterbf:heating/metal/insulation',
        
        'aquaculture:planks_from_driftwood',

        'survivorsaquaculture:heating/neptunian_steel/stairs',
        'survivorsaquaculture:heating/metal/neptunian_steel/slab',
        'survivorsaquaculture:heating/metal/neptunian_steel/stairs',
        'survivorsaquaculture:heating/neptunian_steel/block',
        'survivorsaquaculture:heating/metal/neptunian_steel/fullblock',
        'survivorsaquaculture:heating/neptunian_steel/slab',
        'survivorsaquaculture:heating/neptunium/slab',
        'survivorsaquaculture:heating/neptunium/stairs',

        "alekiships:crafting/oarlock",
        "alekiships:crafting/cleat",
        "alekiships:crafting/anchor",
        "alekiships:crafting/cannonball",

        'tfcorewashing:crafting/powders/hammering/copper_from_nugget',
        'tfcorewashing:crafting/powders/hammering/gold_from_nugget',
        'tfcorewashing:crafting/powders/hammering/silver_from_nugget',

        // 注意：tfc:crafting/metal/block/copper 是薄板+锤子合成铜块的正路配方，不能删

        // 高碳红/蓝钢焊接配方已恢复（tfc.js 重建；原先这两条删除 id 是 1.20 旧路径，从未生效）

        /tfcorewashing:ores\/.*_pressing/
    ]

    ids.forEach(id => {
        event.remove({id: id})
    })

    // 原版金属块拆9锭的配方经OEI替换后会变成群峦金属块拆9个群峦锭，
    // 而群峦金属块只要4个薄板+锤子就能做，1块拆9锭等于凭空刷矿，铜铁金三个都得删
    event.remove({ id: 'minecraft:copper_ingot' })
    event.remove({ id: 'minecraft:iron_ingot_from_iron_block' })
    event.remove({ id: 'minecraft:gold_ingot_from_gold_block' })
    event.remove({ input: 'tfc:metal/block/copper', output: 'tfc:metal/ingot/copper' })
    event.remove({ input: 'tfc:metal/block/wrought_iron', output: 'tfc:metal/ingot/wrought_iron' })
    event.remove({ input: 'tfc:metal/block/gold', output: 'tfc:metal/ingot/gold' })

    // Create Ore Excavation 自带的全套原版矿脉定义和钻探配方（本包用自建 TFC 矿脉，id 前缀 create:vein/ create:drilling/）
    event.remove({ id: /createoreexcavation:ore_vein_type\/(coal|copper|diamond|emerald|glowstone|gold|hardened_diamond|iron|lapis|netherite|nether_gold|quartz|redstone|water|zinc)/ })
    event.remove({ id: /createoreexcavation:drilling\/(coal|copper|diamond|emerald|glowstone|gold|hardened_diamond|iron|lapis|netherite|nether_gold|quartz|redstone|zinc)/ })

    // 禁用全部锻造台配方（包里不走锻造路线，顺带清掉引用不到物品的错误贴图配方）
    event.remove({ type: 'minecraft:smithing' })
})
