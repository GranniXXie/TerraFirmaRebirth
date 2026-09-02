ServerEvents.recipes(event => {
    tfc_wood.forEach(id => {
        event.shapeless(
            `c2tfc:stress_converter/${id}`, 
            [
                "create:shaft", 
                `tfc:wood/gear_box/${id}`,
                "create:cogwheel"
            ]
        ).id(`c2tfc:${id}_stress_converter`)
    })
})
