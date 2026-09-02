// 彻底删除指定精妙背包升级：移除全部产出配方 + 从 JEI 隐藏
// 保留：pickup / filter / magnet / void / feeding（含 advanced）、upgrade_base、各背包本体、tool_swapper
// 注：stack_downgrade_tier_1/2/3 在当前模组版本中并未注册，无需处理
const bannedBackpackUpgrades = [
    "sophisticatedbackpacks:compacting_upgrade",
    "sophisticatedbackpacks:advanced_compacting_upgrade",
    "sophisticatedbackpacks:restock_upgrade",
    "sophisticatedbackpacks:advanced_restock_upgrade",
    "sophisticatedbackpacks:deposit_upgrade",
    "sophisticatedbackpacks:advanced_deposit_upgrade",
    "sophisticatedbackpacks:refill_upgrade",
    "sophisticatedbackpacks:advanced_refill_upgrade",
    "sophisticatedbackpacks:inception_upgrade",
    "sophisticatedbackpacks:smelting_upgrade",
    "sophisticatedbackpacks:auto_smelting_upgrade",
    "sophisticatedbackpacks:everlasting_upgrade",
    "sophisticatedbackpacks:smoking_upgrade",
    "sophisticatedbackpacks:auto_smoking_upgrade",
    "sophisticatedbackpacks:blasting_upgrade",
    "sophisticatedbackpacks:auto_blasting_upgrade",
    "sophisticatedbackpacks:crafting_upgrade",
    "sophisticatedbackpacks:stonecutter_upgrade",
    "sophisticatedbackpacks:stack_upgrade_starter_tier",
    "sophisticatedbackpacks:stack_upgrade_tier_1",
    "sophisticatedbackpacks:stack_upgrade_tier_2",
    "sophisticatedbackpacks:stack_upgrade_tier_3",
    "sophisticatedbackpacks:stack_upgrade_tier_4",
    "sophisticatedbackpacks:stack_upgrade_starter_tier_to_tier_1_conversion",
    "sophisticatedbackpacks:stack_upgrade_starter_tier_to_tier_2_conversion",
    "sophisticatedbackpacks:stack_upgrade_starter_tier_to_tier_3_conversion",
    "sophisticatedbackpacks:stack_upgrade_starter_tier_to_tier_4_conversion",
    "sophisticatedbackpacks:stack_upgrade_tier_1_to_tier_2_conversion",
    "sophisticatedbackpacks:stack_upgrade_tier_1_to_tier_3_conversion",
    "sophisticatedbackpacks:stack_upgrade_tier_1_to_tier_4_conversion",
    "sophisticatedbackpacks:stack_upgrade_tier_2_to_tier_3_conversion",
    "sophisticatedbackpacks:stack_upgrade_tier_2_to_tier_4_conversion",
    "sophisticatedbackpacks:stack_upgrade_tier_3_to_tier_4_conversion",
    "sophisticatedbackpacks:stack_upgrade_omega_tier",
    "sophisticatedbackpacks:jukebox_upgrade",
    "sophisticatedbackpacks:advanced_jukebox_upgrade",
    "sophisticatedbackpacks:advanced_tool_swapper_upgrade",
    "sophisticatedbackpacks:tank_upgrade",
    "sophisticatedbackpacks:battery_upgrade",
    "sophisticatedbackpacks:pump_upgrade",
    "sophisticatedbackpacks:advanced_pump_upgrade",
    "sophisticatedbackpacks:xp_pump_upgrade",
    "sophisticatedbackpacks:anvil_upgrade",
    "sophisticatedbackpacks:smithing_upgrade",
    "sophisticatedbackpacks:infinity_upgrade",
    "sophisticatedbackpacks:survival_infinity_upgrade",
    "sophisticatedbackpacks:alchemy_upgrade",
    "sophisticatedbackpacks:advanced_alchemy_upgrade",
    "sophisticatedbackpacks:mob_catcher_upgrade",
    "sophisticatedbackpacks:advanced_mob_catcher_upgrade"
]

ServerEvents.recipes(event => {
    // 按产出移除：同时覆盖模组自带配方和 tfcsbu 的群峦化配方（含 smithing/anvil 等所有类型）
    bannedBackpackUpgrades.forEach(id => {
        event.remove({ output: id })
    })

    // 冰箱升级（tfcsbu）：大陶缸内胆 + 羊毛隔热 + 升级基底，
    // 四角加 2× 钢板外壳 + 2× 密封砖保温（布局对称）
    //  C A C     C = tfc:metal/sheet/steel（钢板）
    //  w u w     A = #tfc:large_vessels（大陶缸）
    //  S w S     w = tfc:wool，u = upgrade_base，S = firmalife:sealed_bricks（密封砖）
    event.remove({ output: 'tfcsbu:fridge_upgrade' })
    event.shaped('tfcsbu:fridge_upgrade', [
        'CAC',
        'wuw',
        'SwS'
    ], {
        C: 'tfc:metal/sheet/steel',
        A: '#tfc:large_vessels',
        w: 'tfc:wool',
        u: 'sophisticatedbackpacks:upgrade_base',
        S: 'firmalife:sealed_bricks'
    }).id('kubejs:crafting/fridge_upgrade')
})

// JEI 隐藏（KubeJS 1.21 统一配方查看器事件，服务端脚本生效）
RecipeViewerEvents.removeEntries('item', event => {
    bannedBackpackUpgrades.forEach(id => {
        event.remove(id)
    })
    // 气候站配方已被 FirmaLife HardCore 移除（地窖/温室改为自动检测），隐藏避免误导
    event.remove('firmalife:climate_station')
})
