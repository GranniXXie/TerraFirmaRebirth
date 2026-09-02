ServerEvents.recipes(event => {
    // TFCAstikorCarts 按 TFCRegistryAPI 的全部木材注册车辆（43 木 × 7 车型），
    // 但 jar 只附带 34 种木材的配方（TFC 20 + AFC 前 14）。
    // 此处补齐缺口 9 种木材 × 7 车型 = 63 条，模板逐一对照 jar 内
    // data/tfcastikorcarts/recipe/crafting/<车型>/<木材>.json

    // 组 1：AFC 7 种珍稀古木 —— 注册表里没有木板/台阶（只有原木/树皮/枝叶），
    // 配方中的木板统一改用对应原木（1:1）；树本身稀有，稀有度天然兜底平衡。
    const ANCIENT_WOODS = ['black_oak', 'gum_arabic', 'kauri', 'poplar', 'rainbow_eucalyptus', 'redcedar', 'rubber_fig']
    // 组 2：Beneath 2 种下界菌木 —— 有完整木板/台阶，按 jar 模板正常用。
    const BENEATH_WOODS = ['warped', 'crimson']

    const build = (wood, planks, slab) => {
        const wheel = `tfcastikorcarts:wheel/${wood}`

        // 车轮：8 木棍 + 1 木板
        event.shaped(wheel, [
            'sss',
            'sps',
            'sss'
        ], { s: '#c:rods/wooden', p: planks }).id(`tfcastikorcarts:crafting/wheel/${wood}`)

        // 动物运输马车（双座）：7 木板 + 1 车轮
        event.shaped(`tfcastikorcarts:animal_cart/${wood}`, [
            'ppp',
            'ppp',
            'wpw'
        ], { p: planks, w: wheel }).id(`tfcastikorcarts:crafting/animal_cart/${wood}`)

        // 手推车：3 木板 + 1 箱子 + 2 车轮
        event.shaped(`tfcastikorcarts:hand_cart/${wood}`, [
            'pcp',
            'wpw'
        ], { p: planks, c: '#c:chests/wooden', w: wheel }).id(`tfcastikorcarts:crafting/hand_cart/${wood}`)

        // 犁地车：5 木棍 + 2 木板 + 2 车轮
        event.shaped(`tfcastikorcarts:plow/${wood}`, [
            'sss',
            'psp',
            'wpw'
        ], { s: '#c:rods/wooden', p: planks, w: wheel }).id(`tfcastikorcarts:crafting/plow/${wood}`)

        // 收割车：2 木棍 + 1 木板台阶 + 2 木板 + 1 双金属薄板 + 2 车轮
        event.shaped(`tfcastikorcarts:reaper/${wood}`, [
            ' sl',
            'spp',
            'iww'
        ], { s: '#c:rods/wooden', l: slab, p: planks, i: '#c:double_sheets', w: wheel }).id(`tfcastikorcarts:crafting/reaper/${wood}`)

        // 播种车：5 木板 + 1 箱子 + 1 漏斗 + 2 车轮
        event.shaped(`tfcastikorcarts:seed_drill/${wood}`, [
            'pcp',
            'php',
            'wpw'
        ], { p: planks, c: '#c:chests/wooden', h: 'minecraft:hopper', w: wheel }).id(`tfcastikorcarts:crafting/seed_drill/${wood}`)

        // 货运马车：5 木板 + 2 箱子 + 2 车轮
        event.shaped(`tfcastikorcarts:supply_cart/${wood}`, [
            'pcp',
            'pcp',
            'wpw'
        ], { p: planks, c: '#c:chests/wooden', w: wheel }).id(`tfcastikorcarts:crafting/supply_cart/${wood}`)
    }

    ANCIENT_WOODS.forEach(w => build(w, `afc:wood/log/${w}`, `afc:wood/log/${w}`))
    BENEATH_WOODS.forEach(w => build(w, `beneath:wood/planks/${w}`, `beneath:wood/planks/${w}_slab`))
})
