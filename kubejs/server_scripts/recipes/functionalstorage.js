ServerEvents.recipes(event => {
    const {shaped, shapeless} = event.recipes.kubejs
    const {sequenced_assembly, deploying} = event.recipes.create

    shaped("functionalstorage:simple_compacting_drawer", [
        "BBB",
        "BCD",
        "BAB"
    ], {
        A: "tfc:metal/sheet/wrought_iron",
        B: "#c:stones",
        C: "#functionalstorage:drawer",
        D: "create:mechanical_press"
    }).id("functionalstorage:simple_compacting_drawer")

    shaped("functionalstorage:compacting_drawer", [
        "BBB",
        "DCD",
        "BAB"
    ], {
        A: "tfc:metal/sheet/wrought_iron",
        B: "#c:stones",
        C: '#functionalstorage:drawer',
        D: "create:mechanical_press"
    }).id("functionalstorage:compacting_drawer")

    event.replaceInput({mod:"functionalstorage"},"minecraft:stone","#c:stones")
    event.replaceInput({id:'functionalstorage:storage_controller'},"#c:stones","tfc:metal/ingot/wrought_iron")
    //钻石块已被禁：钻石升级的块槽位改用TFC钻石（c:gems/diamond标签TFC已注册，此处只需替换块标签）
    event.replaceInput({id:'functionalstorage:diamond_upgrade'},"#c:storage_blocks/diamond","tfc:gem/diamond")

    // Create 1.21 原生 JSON：KJS 会把 tag 成分序列化成流体输入，必须用 custom
    const seqDeploy = (held, other) => ({
        type: 'create:deploying',
        ingredients: [{item: held}, other],
        results: [{id: held}]
    })

    event.custom({
        type: 'create:sequenced_assembly',
        ingredient: {item: 'immersiveengineering:plate_steel'},
        loops: 1,
        results: [{id: 'functionalstorage:collector_upgrade'}],
        sequence: [
            seqDeploy('kubejs:unfinished_collector_upgrade', {tag: 'functionalstorage:drawer'}),
            seqDeploy('kubejs:unfinished_collector_upgrade', {item: 'minecraft:hopper'}),
            seqDeploy('kubejs:unfinished_collector_upgrade', {item: 'minecraft:hopper'})
        ],
        transitional_item: {id: 'kubejs:unfinished_collector_upgrade'}
    }).id('functionalstorage:sequenced_assembly/collector_upgrade')

    event.custom({
        type: 'create:sequenced_assembly',
        ingredient: {item: 'immersiveengineering:plate_steel'},
        loops: 1,
        results: [{id: 'functionalstorage:puller_upgrade'}],
        sequence: [
            seqDeploy('kubejs:unfinished_puller_upgrade', {item: 'minecraft:hopper'}),
            seqDeploy('kubejs:unfinished_puller_upgrade', {tag: 'functionalstorage:drawer'}),
            seqDeploy('kubejs:unfinished_puller_upgrade', {item: 'minecraft:redstone'})
        ],
        transitional_item: {id: 'kubejs:unfinished_puller_upgrade'}
    }).id('functionalstorage:sequenced_assembly/puller_upgrade')

    event.custom({
        type: 'create:sequenced_assembly',
        ingredient: {item: 'immersiveengineering:plate_steel'},
        loops: 1,
        results: [{id: 'functionalstorage:pusher_upgrade'}],
        sequence: [
            seqDeploy('kubejs:unfinished_pusher_upgrade', {item: 'minecraft:redstone'}),
            seqDeploy('kubejs:unfinished_pusher_upgrade', {tag: 'functionalstorage:drawer'}),
            seqDeploy('kubejs:unfinished_pusher_upgrade', {item: 'minecraft:hopper'})
        ],
        transitional_item: {id: 'kubejs:unfinished_pusher_upgrade'}
    }).id('functionalstorage:sequenced_assembly/pusher_upgrade')

    shapeless("functionalstorage:puller_upgrade", "functionalstorage:pusher_upgrade")
    .id('functionalstorage:puller_upgrade')
    
    shapeless("functionalstorage:pusher_upgrade", "functionalstorage:puller_upgrade")
    .id('functionalstorage:pusher_upgrade')
})