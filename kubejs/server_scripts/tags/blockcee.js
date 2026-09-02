// CEE 接地棒可放置方块补充
// electroenergetics:earth 模组自带：#minecraft:dirt + #minecraft:sand + #c:gravels + #c:stones
// TFC 已把 草/泥土/泥/沙子/砂砾/原生岩/硬化岩 挂进上述标签，以下只补漏掉的"大地"方块
ServerEvents.tags('block', event => {

    event.add('electroenergetics:earth', [
        // 粘土全家桶（粘土/粘土草/粘土腐殖土/高岭土），直接用 TFC 自己的标签
        '#tfc:clays',
        // 森林地表的腐殖质层
        '#tfc:duff',
        // 踩出来的草径（含原版土径）
        '#tfc:paths',
        // 泥炭地与泥炭草
        'tfc:peat',
        'tfc:peat_grass',
        // 天然砂岩（七种颜色的原生砂岩；平滑/切制属于建材，不加）
        'tfc:raw_sandstone/brown',
        'tfc:raw_sandstone/white',
        'tfc:raw_sandstone/black',
        'tfc:raw_sandstone/red',
        'tfc:raw_sandstone/yellow',
        'tfc:raw_sandstone/green',
        'tfc:raw_sandstone/pink',
        // 月壤——到了月球也得接地
        'rocketnautics:lunar_regolith',
        'rocketnautics:lunar_loose_regolith',
        'rocketnautics:lunar_shattered_regolith'
    ])
})
