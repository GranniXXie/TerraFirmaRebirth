StartupEvents.registry('item', event => {
	event.create('unfinished_collector_upgrade', 'create:sequenced_assembly')
    .texture("immersiveengineering:item/metal_plate_steel")

    event.create("unfinished_puller_upgrade", 'create:sequenced_assembly')
    .texture("immersiveengineering:item/metal_plate_steel")

    event.create("unfinished_pusher_upgrade", 'create:sequenced_assembly')
    .texture("immersiveengineering:item/metal_plate_steel")

    event.create('unfinished_paper', 'create:sequenced_assembly')
    .texture('minecraft:item/paper')

    event.create("unfinished_raw_kaolin_clay", 'create:sequenced_assembly')
    .texture('kubejs:item/raw_kaolin_clay')
    
    event.create("unfinished_steel", 'create:sequenced_assembly')
    .texture('kubejs:item/hot_high_carbon_steel')

    event.create("unfinished_wrought_iron", 'create:sequenced_assembly')
    .texture('kubejs:item/hot_iron_bloom')

    event.create("unfinished_pulp", 'create:sequenced_assembly')
    .texture('create:item/pulp')
})
