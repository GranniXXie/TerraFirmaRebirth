// 红石元件群峦化配方（原版配方因需要原版圆石/石头不可用，保持封禁）
ServerEvents.recipes(event => {
    // 侦测器：原版布局，圆石 → 群峦圆石（挖矿基础产物，对应原版定位）
    event.shaped('minecraft:observer', [
        'CCC',
        'RRQ',
        'CCC'
    ], {
        C: '#kubejs:cobbles',
        R: 'minecraft:redstone',
        Q: 'minecraft:quartz'
    }).id('kubejs:crafting/observer')

    // 比较器：原版布局，石头 → 群峦天然石（挖石头基础产物，对齐 3.4 版本配方）
    event.shaped('minecraft:comparator', [
        ' T ',
        'TQT',
        'SSS'
    ], {
        T: 'minecraft:redstone_torch',
        Q: 'minecraft:quartz',
        S: '#c:stones/raw'
    }).id('kubejs:crafting/comparator')

    // 指南针：原版布局，铁锭 → 群峦锻铁锭（原版铁锭不可用，原版配方封禁后以此为准）
    event.remove({ output: 'minecraft:compass' })
    event.shaped('minecraft:compass', [
        ' I ',
        'IRI',
        ' I '
    ], {
        I: 'tfc:metal/ingot/wrought_iron',
        R: 'minecraft:redstone'
    }).id('kubejs:crafting/compass')

    // ===== 红石元件补全审查（4.1.20反馈：redstone_contact等只支持原版圆石）=====
    // 原料映射约定：原版圆石→#kubejs:cobbles（群峦圆石）、原版石头→#c:stones/raw（群峦天然石）、
    // 原版铁锭→群峦锻铁锭、原版铜锭→#c:ingots/copper（即群峦铜锭）、干草块→tfc:thatch（茅草）
    // 木棍已由 misc.js 全局替换为 #c:rods/wooden（群峦树枝），无需重复处理

    // 活塞：原版布局，圆石+原版铁锭替换
    event.remove({ output: 'minecraft:piston', mod: 'minecraft' })
    event.shaped('minecraft:piston', [
        'TTT',
        'CXC',
        'CRC'
    ], {
        T: '#minecraft:planks',
        C: '#kubejs:cobbles',
        X: 'tfc:metal/ingot/wrought_iron',
        R: 'minecraft:redstone'
    }).id('kubejs:crafting/piston')

    // 投掷器：原版布局
    event.remove({ output: 'minecraft:dropper', mod: 'minecraft' })
    event.shaped('minecraft:dropper', [
        'CCC',
        'C C',
        'CRC'
    ], {
        C: '#kubejs:cobbles',
        R: 'minecraft:redstone'
    }).id('kubejs:crafting/dropper')

    // 发射器：原版布局（弓的获取见报告说明）
    event.remove({ output: 'minecraft:dispenser', mod: 'minecraft' })
    event.shaped('minecraft:dispenser', [
        'CCC',
        'CXC',
        'CRC'
    ], {
        C: '#kubejs:cobbles',
        X: 'minecraft:bow',
        R: 'minecraft:redstone'
    }).id('kubejs:crafting/dispenser')

    // 拉杆：原版布局
    event.remove({ output: 'minecraft:lever', mod: 'minecraft' })
    event.shaped('minecraft:lever', [
        'X',
        'C'
    ], {
        X: '#c:rods/wooden',
        C: '#kubejs:cobbles'
    }).id('kubejs:crafting/lever')

    // 绊线钩：原版布局，原版铁锭→锻铁锭
    event.remove({ output: 'minecraft:tripwire_hook', mod: 'minecraft' })
    event.shaped('2x minecraft:tripwire_hook', [
        'I',
        'S',
        '#'
    ], {
        I: 'tfc:metal/ingot/wrought_iron',
        S: '#c:rods/wooden',
        '#': '#minecraft:planks'
    }).id('kubejs:crafting/tripwire_hook')

    // 中继器：原版布局，石头→群峦天然石（与比较器同规）
    event.remove({ output: 'minecraft:repeater', mod: 'minecraft' })
    event.shaped('minecraft:repeater', [
        'T T',
        'XTX',
        'SSS'
    ], {
        T: 'minecraft:redstone_torch',
        X: 'minecraft:redstone',
        S: '#c:stones/raw'
    }).id('kubejs:crafting/repeater')

    // 石头按钮/石头压力板：石头→群峦天然石
    event.remove({ output: 'minecraft:stone_button', mod: 'minecraft' })
    event.shapeless('minecraft:stone_button', ['#c:stones/raw']).id('kubejs:crafting/stone_button')
    event.remove({ output: 'minecraft:stone_pressure_plate', mod: 'minecraft' })
    event.shaped('minecraft:stone_pressure_plate', [
        'SS'
    ], {
        S: '#c:stones/raw'
    }).id('kubejs:crafting/stone_pressure_plate')

    // 标靶：干草块→群峦茅草（原版小麦不可得，茅草为群峦干草对应物）
    event.remove({ output: 'minecraft:target', mod: 'minecraft' })
    event.shaped('minecraft:target', [
        ' R ',
        'RHR',
        ' R '
    ], {
        H: 'tfc:thatch',
        R: 'minecraft:redstone'
    }).id('kubejs:crafting/target')

    // 避雷针：原版布局，原版铜锭→群峦铜锭（Create 发射器/无线红石链的前置）
    event.remove({ output: 'minecraft:lightning_rod', mod: 'minecraft' })
    event.shaped('minecraft:lightning_rod', [
        '#',
        '#',
        '#'
    ], {
        '#': '#c:ingots/copper'
    }).id('kubejs:crafting/lightning_rod')

    // Create 红石连接器：原版布局，圆石→群峦圆石（铁板标签已由 KJS 桥接群峦锻铁板）
    event.remove({ id: 'create:crafting/logistics/redstone_contact' })
    event.shaped('2x create:redstone_contact', [
        ' S ',
        'CWC',
        'CCC'
    ], {
        C: '#kubejs:cobbles',
        S: '#c:plates/iron',
        W: '#c:dusts/redstone'
    }).id('kubejs:crafting/redstone_contact')
})
