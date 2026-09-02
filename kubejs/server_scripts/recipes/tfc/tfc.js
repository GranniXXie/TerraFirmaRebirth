ServerEvents.recipes(event => {

    const {
        anvil, 
        heating, 
        barrel_sealed, 
        // damage_inputs_shapeless_crafting API changed in KubeJSTFC 1.21
        scraping, 
        // damage_inputs_shaped_crafting API changed in KubeJSTFC 1.21
        advanced_shaped_crafting
    } = event.recipes.tfc

    //空烈焰人燃烧室
    anvil('create:empty_blaze_burner', 'tfc:metal/double_ingot/wrought_iron', ['hit_not_last', 'bend_any','bend_any']).tier(3)

    //传动杆锻打配方降级：tfc_aeronautics 原配方要三级砧（锻铁砧），降级为一级砧（铜砧），让玩家早期就能发展机械动力
    //输入输出与打击规则完全不变（1安山合金锭→4根传动杆），只降砧级
    event.remove({ id: 'tfc_aeronautics:anvil/andesite_alloy_shaft' })
    anvil('4x create:shaft', '#c:ingots/andesite_alloy', ['punch_last', 'hit_second_last', 'punch_third_last']).tier(1)
        .id('tfc_aeronautics:anvil/andesite_alloy_shaft')

    //加热得燃烧室
    heating('create:empty_blaze_burner', 1540)
    .resultItem('create:blaze_burner')
    .id('tfc:heating/empty_blaze_burner')

    //海带烘干：火盆/锻造炉加热即可，不再只有砂锅一条路
    event.remove({id: 'farmerstfc:heating/dried_kelp'})
    heating('#tfc:plants/kelp', 200)
    .resultItem('tfc:food/dried_kelp')
    .id('tfc:heating/dried_kelp')

    //高定向热解石墨锭：坩埚炽白加热石墨粉（任务书"HOPG"一节描述的工艺）
    heating('immersiveengineering:dust_hop_graphite', 1540)
    .resultItem('immersiveengineering:ingot_hop_graphite')
    .id('tfc:heating/hop_graphite_ingot')

    //石英种子配方已移除（AE2已删除）
    // barrel_sealed(10000)
    // .outputItem("ae2:certus_quartz_crystal")
    // .inputItem('kubejs:crystal_seed_certus')
    // .inputFluid(Fluid.water(1000))
    // .id('tfc:barrel_sealed/certus_quartz_crystal')

    // tfcgroomer items do not exist - commented out
    // tfcgroomer_metal_kind.forEach(m => {
    //     heating(`tfcgroomer:${m}_grooming_station`, 1500)
    //     .resultFluid(Fluid.of(`tfc:metal/${m}`, 1000))
    //     .id(`tfc:heating/${m}_grooming_station`)
    // })

    //菠萝布修复 - damage_inputs_shapeless_crafting API changed
    // damage_inputs_shapeless_crafting(
    //     event.shapeless(
    //         "firmalife:pineapple_fiber",
    //         [
    //             '#minecraft:axes', 
    //             notRotten('firmalife:food/pineapple')
    //         ]
    //     )
    // ).id('tfc:damage_inputs_shapeless_crafting/pineapple_fiber')

    anvil(
        "8x minecraft:chain",
        "tfc:metal/ingot/cast_iron",
        [
            "hit_any",
            "hit_any",
            "draw_last"
        ]
    ).tier(1)
    .id('tfc:anvil/chain')

    event.shaped("tfc:handstone", [
        'a  ',
        'bbb'
    ], {
        a:'#c:rods/wooden',
        b:'#c:stones'
    }).id('tfc:crafting/handstone')

    //刮 诅咒兽皮 - 已移除：tfc_coldsweat 2.1.2 中不存在 cursed 系列物品
    // scraping(
    //     "tfc_coldsweat:cursed_scraped_hide",
    //     "tfc_coldsweat:cursed_soaked_hide",
    //     "tfc_coldsweat:item/cursed_scraped_hide",
    //     "tfc_coldsweat:item/cursed_soaked_hide"
    // ).id('tfc_coldsweat:scraping/cursed_soaked_hide')

    //切鱼 - damage_inputs_shapeless_crafting API changed
    // damage_inputs_shapeless_crafting(
    //     event.shapeless("aquaculture:fish_fillet_raw", [
    //         "tfc:stone/knife/igneous_intrusive",
    //         notRotten("aquaculture:minnow")
    //     ])
    // ).id('tfc:damage_inputs_shapeless_crafting/cut_minnow')

    const stone_rack_types = [
        "igneous_extrusive",
        "igneous_intrusive",
        "metamorphic",
        "sedimentary"
    ]

    const anvil_tools = {
        'axe': ["punch_last", "hit_second_last", "upset_third_last"],
        'hammer': ["punch_last", "shrink_not_last"],
        'javelin': ["hit_last", "draw_not_last"],
        'hoe': ["punch_last", "hit_not_last", "bend_not_last"],
        'knife': ["hit_last", "draw_second_last", "draw_third_last"],
        'shovel': ["punch_last", "hit_not_last"]
    }

    for(let type of stone_rack_types) {
        for(let [tool, rule] of Object.entries(anvil_tools)) {
            anvil(`tfc:stone/${tool}_head/${type}`, `#tfc:stones/loose/${type}`, rule).tier(0)
            .applyBonus()
            .id(`tfc:anvil/${type}_${tool}_head`)

            advanced_shaped_crafting(
                `tfc:stone/${tool}/${type}`,
                [
                    'a',
                    'b'
                ],
                {
                    a:`tfc:stone/${tool}_head/${type}`,
                    b:'#c:rods/wooden'
                }
            ).id(`tfc:crafting/stone/${tool}_${type}`)
        }
    }

    // tfcr flask recipes removed - mod not installed
    // anvil("tfcr:unfinished_black_steel_flask", "tfc:metal/sheet/black_steel", [
    //     "punch_last",
    //     "bend_second_last",
    //     "bend_third_last"
    // ]).id('tfc:anvil/unfinished_black_steel_flask')

    // damage_inputs_shaped_crafting(
    //     event.shaped("tfcr:black_steel_flask", [
    //         ' ab',
    //         'cdc',
    //         'efe'
    //     ], {
    //         a:'#c:string',
    //         b:'#tfc:knives',
    //         c:"tfc:silk_cloth",
    //         d:"waterflasks:bladder",
    //         e:"waterflasks:leather_side",
    //         f:"tfcr:unfinished_black_steel_flask"
    //     })
    // ).id('tfc:damage_inputs_shaped_crafting/black_steel_flask')

    heating("tfcbetterbf:insulation", 1535)
    .resultFluid(Fluid.of('tfc:metal/cast_iron', 600))
    .id('tfc:heating/insulation')

    event.replaceInput({id: 'tfc:crafting/vanilla/cauldron'}, "tfc:metal/sheet/wrought_iron", "tfc_ie_addon:metal/sheet/aluminum")

    // ===== 红蓝钢手工焊接（强制重建，对齐 TFC 官方配方）=====
    // 脆红钢 + 黑钢 → 高碳红钢；脆蓝钢 + 黑钢 → 高碳蓝钢（任意砧，tier -1）
    // 高碳锭再经锻打得到红/蓝钢锭，是 3.2 时代的手工路线
    event.remove({ id: 'tfc:welding/metal/ingot/high_carbon_red_steel' })
    event.remove({ id: 'tfc:welding/metal/ingot/high_carbon_blue_steel' })

    event.custom({
        type: 'tfc:welding',
        first_input: { tag: 'c:ingots/weak_red_steel' },
        second_input: { tag: 'c:ingots/black_steel' },
        result: { count: 1, id: 'tfc:metal/ingot/high_carbon_red_steel' },
        tier: -1
    }).id('tfc:welding/metal/ingot/high_carbon_red_steel')

    event.custom({
        type: 'tfc:welding',
        first_input: { tag: 'c:ingots/weak_blue_steel' },
        second_input: { tag: 'c:ingots/black_steel' },
        result: { count: 1, id: 'tfc:metal/ingot/high_carbon_blue_steel' },
        tier: -1
    }).id('tfc:welding/metal/ingot/high_carbon_blue_steel')

    // ===== 菠萝纤维补链（08-29）=====
    // 之前删掉了 firmalife:drying/pineapple_fiber（鲜菠萝→纤维），解决与通用水果烘干
    // （firmalife:drying/dry_fruits，鲜菠萝→干菠萝）的双配方冲突——按配方id排序
    // dry_fruits 优先命中，鲜菠萝实际上只会变成干菠萝。
    // 但删掉后 EMI 里菠萝纤维只剩小刀配方（tfc:advanced_shapeless_crafting 带特质条件，EMI 不显示），
    // 玩家完全找不到纤维获取途径。补一条烘干配方：干菠萝（带 firmalife:dried 特质）→ 纤维。
    // 与 dry_fruits 不冲突：干菠萝已带 dried 特质，不满足 dry_fruits 的 lacks_trait 条件。
    event.custom({
        type: 'firmalife:drying',
        ingredient: {
            type: 'tfc:and',
            children: [
                { item: 'firmalife:food/pineapple' },
                { type: 'tfc:has_trait', trait: 'firmalife:dried' }
            ]
        },
        result: { count: 1, id: 'firmalife:pineapple_fiber' }
    }).id('kubejs:drying/pineapple_fiber_from_dried')
})
