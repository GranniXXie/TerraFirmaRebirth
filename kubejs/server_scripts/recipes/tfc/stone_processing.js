ServerEvents.recipes(event => {
    const {deploying, crushing, compacting} = event.recipes.create

    const preId = 'tfc:stone_processing/'

    tfc_stone_types.forEach(stone => {
        //碎石用凿子加工成砖（Create 1.21 原生 JSON，避免 KJS 把 tag 成分序列化成流体）
        event.custom({
            type: 'create:deploying',
            ingredients: [
                {item: `tfc:rock/loose/${stone}`},
                {tag: 'c:tools/chisel'}
            ],
            results: [{id: `tfc:brick/${stone}`}]
        }).id(`${preId}deploying/loose/${stone}`)

        event.custom({
            type: 'create:deploying',
            ingredients: [
                {item: `tfc:rock/mossy_loose/${stone}`},
                {tag: 'c:tools/chisel'}
            ],
            results: [{id: `tfc:brick/${stone}`}]
        }).id(`${preId}deploying/mossy_loose/${stone}`)

        //圆石、沙砾的粉碎。不含沙砾石磨
        crushing(`tfc:rock/gravel/${stone}`, `tfc:rock/cobble/${stone}`)
        .id(`${preId}crushing/cobble/${stone}`)

        crushing(
            [
                'minecraft:sand', 
                'minecraft:flint',
                'minecraft:clay_ball'
            ], 
            `tfc:rock/gravel/${stone}`
        ).id(`${preId}crushing/gravel/${stone}`)

        //和熔岩辊压成天然石
        compacting(
            `tfc:rock/raw/${stone}`, 
            [
                `4x tfc:rock/loose/${stone}`,
                Fluid.lava(50)
            ]
        ).superheated()
        .id(`${preId}compacting/raw/${stone}`)
    })
})
