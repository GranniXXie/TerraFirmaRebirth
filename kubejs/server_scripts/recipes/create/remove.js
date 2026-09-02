ServerEvents.recipes(event => {
    const ids = [
        'create:milling/saddle',
        'create:crushing/leather_horse_armor',
        'create:mixing/cardboard_pulp',
        // 'create:splashing/mekanism/crushed_raw_osmium',
        'create:pressing/sugar_cane',

        // 手摇轮配方已恢复（create_connected 原配方：手摇柄 + 齿轮/大齿轮）

        // createutilities 模组不在包内，相关 remove 已删除

        // create_new_age 已移除（电力系统换代为 Electro Energetics）
        'create:splashing/red_sand',

        // tfc_aeronautics 紧板冲压与 create 原版压板配方输入相同（#c:ingots/copper），
        // 会抢占铜板产出导致铜阀柄等断料；紧板只保留砧上锻打路线
        'create:pressing/tight_sheet_copper',
        'create:pressing/tight_sheet_wrought_iron',
        'create:pressing/tight_sheet_steel'
    ]

    ids.forEach(id => {
        event.remove({id: id})
    })
})
