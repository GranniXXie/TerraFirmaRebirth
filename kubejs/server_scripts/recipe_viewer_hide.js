// JEI 侧隐藏（EMI 侧由 tfcr-fixes 的 TfcrEmiPlugin 处理）：
// 1) TFCAstikorCarts 给 AFC 38 种"只有树叶/树苗、没有原木木板"的木材也注册了车/轮物品，
//    这些物品永远无法合成，纯占位垃圾。
// 2) woodencog 的 */unfinished 半成品（无贴图紫黑块）。
RecipeViewerEvents.removeEntries('item', event => {
    const LEAF_ONLY = [
        'acacia_koa', 'atlas_cedar', 'bald_cypress', 'balsam_fir', 'bigleaf_maple',
        'black_beech', 'black_spruce', 'chinquapin', 'coast_redwood', 'coast_spruce',
        'columnar_araucaria', 'dawn_redwood', 'flame_of_the_forest', 'giant_rosewood',
        'hardy_chestnut', 'horsetail_ironwood', 'huangshan_pine', 'iroko_teak',
        'jaggery_palm', 'juniper', 'lebombo_ironwood', 'live_oak', 'mountain_ash',
        'mountain_fir', 'mpingo_blackwood', 'parana', 'rauli_beech', 'red_pine',
        'red_silk_cotton', 'sapele_mahogany', 'scrub_hickory', 'sitka_spruce',
        'small_leaf_mahogany', 'stone_pine', 'tamarack', 'weeping_cypress',
        'weeping_maple', 'weeping_willow'
    ]
    const TYPES = ['wheel', 'animal_cart', 'hand_cart', 'plow', 'reaper', 'seed_drill', 'supply_cart']
    LEAF_ONLY.forEach(w => TYPES.forEach(t => event.remove(`tfcastikorcarts:${t}/${w}`)))
    event.remove(/woodencog:.*\/unfinished/)
})
