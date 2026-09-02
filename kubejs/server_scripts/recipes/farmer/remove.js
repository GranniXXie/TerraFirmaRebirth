ServerEvents.recipes(event => {
    const ids = [
        "farmersdelight:salvaging/leather_horse_armor",
        'farmersdelight:salvaging/saddle',
        'farmersdelight:salvaging/leather_armor',
        'farmersdelight:tomato_seeds'
    ]
    ids.forEach(id => {
        event.remove({id: id})
    })
})
