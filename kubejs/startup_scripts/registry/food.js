//群峦方便食品注册
StartupEvents.registry("item", event => {
    event.create("tfcr:super_hardtack")
         .texture('kubejs:item/super_hardtack')
         .food(foodbuilder => {
             foodbuilder.effect("minecraft:speed", 20 * 300, 1, 1)
             foodbuilder.effect("regeneration", 20 * 30, 0, 1)
         })

    event.create("tfcr:powdered_meat")
         .texture('kubejs:item/powdered_meat')

    event.create("tfcr:powdered_vegetable")
         .texture('kubejs:item/powdered_vegetable')

    event.create("tfcr:powdered_fruit")
         .texture('kubejs:item/powdered_fruit')
})
