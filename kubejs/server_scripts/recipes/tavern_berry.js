// TFC 浆果 × 森罗酒馆兼容
// 森罗酒馆的甜浆果链（榨汁桶→甜浆果汁→甜浆果酒）原本只认 minecraft:sweet_berries（群峦世界不产）
// 这里用 11 种群峦灌木浆果建标签，给榨汁桶和酒桶各加一条变体配方
// 树莓/黑莓/蓝莓等从此可以直接酿酒
ServerEvents.tags('item', event => {
    event.add('kubejs:tavern_berries', [
        'tfc:food/blackberry',
        'tfc:food/blueberry',
        'tfc:food/bunchberry',
        'tfc:food/cloudberry',
        'tfc:food/cranberry',
        'tfc:food/elderberry',
        'tfc:food/gooseberry',
        'tfc:food/raspberry',
        'tfc:food/snowberry',
        'tfc:food/strawberry',
        'tfc:food/wintergreen_berry'
    ])
})

ServerEvents.recipes(event => {
    // 榨汁桶：群峦浆果 → 甜浆果汁（对标原版 pressing_tub/sweet_berries_bucket）
    event.custom({
        type: 'kaleidoscope_tavern:pressing_tub',
        fluid: 'kaleidoscope_tavern:sweet_berries_juice',
        ingredient: { tag: 'kubejs:tavern_berries' }
    }).id('kubejs:pressing_tub/tfc_berries_juice')

    // 酒桶：甜浆果汁 + 群峦浆果 + 空瓶 → 甜浆果酒（对标原版 barrel/sweet_berry_wine）
    event.custom({
        type: 'kaleidoscope_tavern:barrel',
        carrier: { item: 'kaleidoscope_tavern:empty_bottle' },
        fluid: 'kaleidoscope_tavern:sweet_berries_juice',
        ingredients: [{ tag: 'kubejs:tavern_berries' }],
        result: { count: 1, id: 'kaleidoscope_tavern:sweet_berry_wine' }
    }).id('kubejs:barrel/sweet_berry_wine_from_tfc_berries')
})
