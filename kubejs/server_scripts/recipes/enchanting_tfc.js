//EnchantingWithTFC 移植（github.com/Mrthomas20121-Mods/EnchantingWithTFC，1.21.1 数据驱动重写）
//附魔台配方：书 + 红羊毛 + 锻铁板×2 + 黑曜石×3（原模组配方，用户拍板照原样）
ServerEvents.recipes(event => {
    event.shaped('minecraft:enchanting_table', [
        ' B ',
        'DWD',
        '###'
    ], {
        B: 'minecraft:book',
        D: 'tfc:metal/sheet/wrought_iron',
        W: 'minecraft:red_wool',
        '#': 'minecraft:obsidian'
    }).id('kubejs:enchanting_table_tfc')
})

//矿石经验：原模组是所有矿 1~5 点，咱包挖矿量巨大会沦为刷经验机
//平衡方案：贫矿 1 点 / 普通 1~2 点 / 富矿 2~3 点 / 非金属矿块（钻石、石墨等，稀少）2 点 / 地表小矿石 0 点
BlockEvents.drops(event => {
    let id = String(event.block.id)
    if (!id.startsWith('tfc:ore/')) return
    let ore = id.substring(8)
    if (ore.startsWith('small_')) return
    if (ore.startsWith('poor_')) event.xp = 1
    else if (ore.startsWith('normal_')) event.xp = 1 + event.level.random.nextInt(2)
    else if (ore.startsWith('rich_')) event.xp = 2 + event.level.random.nextInt(2)
    else event.xp = 2
})
