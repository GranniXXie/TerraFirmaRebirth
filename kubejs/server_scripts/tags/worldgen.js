ServerEvents.tags('worldgen/placed_feature', event => {
    event.remove('tfc:in_biome/veins', [
        "artisanal:vein/surface_sweet_crude_oil",
        "artisanal:vein/surface_sour_crude_oil",
        "artisanal:vein/normal_sweet_crude_oil",
        "artisanal:vein/normal_sour_crude_oil"
    ])
})