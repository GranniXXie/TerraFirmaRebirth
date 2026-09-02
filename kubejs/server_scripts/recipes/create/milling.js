ServerEvents.recipes(event => {
    const {milling} = event.recipes.create

    milling('4x tfc:powder/sulfur','tfc:ore/sulfur').id('create:milling/sulfur')
    milling('4x tfc:powder/graphite','tfc:ore/graphite').id('create:milling/graphite')
    milling('6x tfc:powder/flux','tfc:ore/borax').id('create:milling/flux')
    event.custom({
        type: 'create:milling',
        ingredients: [{tag: 'tfc:fluxstone'}],
        results: [{id: 'tfc:powder/flux', count: 2}]
    }).id('create:milling/flux_1')
    milling('tfc:ore/gypsum','tfc:rock/raw/limestone').id('create:milling/gypsum')
    milling('4x tfc:powder/ruby','tfc:ore/ruby').id('create:milling/ruby')
    milling('4x tfc:powder/ruby','tfc:gem/ruby').id('create:milling/ruby_1')
    milling('4x minecraft:redstone','tfc:ore/cinnabar').id('create:milling/redstone')
    milling('4x minecraft:redstone','tfc:ore/cryolite').id('create:milling/redstone_1')
    milling('4x tfc:powder/pyrite','tfc:gem/pyrite').id('create:milling/pyrite')
    milling('4x tfc:powder/pyrite','tfc:ore/pyrite').id('create:milling/pyrite_1')
    milling('4x tfc:powder/lapis_lazuli','tfc:ore/lapis_lazuli').id('create:milling/lapis_lazuli')
    milling('4x tfc:powder/lapis_lazuli','tfc:gem/lapis_lazuli').id('create:milling/lapis_lazuli_1')
    milling('4x tfc:powder/diamond','tfc:gem/diamond').id('create:milling/diamond')
    milling('4x tfc:powder/diamond','tfc:ore/diamond').id('create:milling/diamond_1')
    milling('4x tfc:powder/opal','tfc:gem/opal').id('create:milling/opal')
    milling('4x tfc:powder/opal','tfc:ore/opal').id('create:milling/opal_1')
    milling('4x tfc:powder/emerald','tfc:gem/emerald').id('create:milling/emerald')
    milling('4x tfc:powder/emerald','tfc:ore/emerald').id('create:milling/emerald_1')
    milling('4x tfc:powder/topaz','tfc:gem/topaz').id('create:milling/topaz')
    milling('4x tfc:powder/topaz','tfc:ore/topaz').id('create:milling/topaz_1')
    milling('4x tfc:powder/sapphire','tfc:gem/sapphire').id('create:milling/sapphire')
    milling('4x tfc:powder/sapphire','tfc:ore/sapphire').id('create:milling/sapphire_1')
    milling('4x tfc:powder/amethyst','tfc:gem/amethyst').id('create:milling/amethyst')
    milling('4x tfc:powder/amethyst','tfc:ore/amethyst').id('create:milling/amethyst_1')
})