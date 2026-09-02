ServerEvents.recipes(event => {
    // ============ 航空航天兼容魔改 ============
    // 1. 钛矿走 TFC 矿脉（kubejs/data/rocketnautics/worldgen/...，rarity 80 低几率）
    // 2. 悬浮石：登月后奖励，月壤粉碎出"月尘"替代末地石粉
    // 3. 钛合金：下界合金碎片改为下界合金锭（对齐彩钢电弧炉时代）
    // 4. 深渊维度不启用（内嵌 mod 无法干净移除，任务书不引用）
    // 5. 航空学起点 = 铸铁时代

    // ---------- 2. 悬浮石：月岩路线 ----------
    // 官方：末地石 → 粉碎 → 末地石粉（末地不存在，断链）
    // 魔改：月壤 → 粉碎 → 月尘（复用 end_stone_powder 物品，已 lang 改名为"月尘"）
    // 2.0 完整月壤保底途径：官方只有"精准采集掉本体/烧炼破碎月壤"两条路，
    // 精准采集本包流程拿不到、烧炼被 remove.js 全局移除 smelting/blasting 误杀，
    // 导致月尘（悬浮石）与浮空水晶全线断链（玩家实锤）。补 2x2 拼合：4 破碎 → 1 完整。
    event.shaped('rocketnautics:lunar_regolith', ['XX', 'XX'], {
        X: 'rocketnautics:lunar_shattered_regolith'
    }).id('kubejs:crafting/lunar_regolith_from_shattered')
    event.remove({ id: 'aeronautics:crushing/end_stone_powder' })
    event.recipes.create.crushing(
        [
            'aeronautics:end_stone_powder',
            CreateItem.of('aeronautics:end_stone_powder', 0.5)
        ],
        'rocketnautics:lunar_regolith'
    ).id('kubejs:crushing/moon_dust_from_lunar_regolith')

    // ---------- 3. 钛合金：下界合金锭 ----------
    // 3 钛锭 + 1 下界合金锭，超级加热搅拌（包内下界合金 = 电弧炉 8红钢+8蓝钢+32地狱疣）
    event.remove({ id: 'rocketnautics:mixing/titanium_alloy' })
    event.recipes.create.mixing(
        '4x rocketnautics:titanium_alloy',
        [
            '3x rocketnautics:titanium_ingot',
            'minecraft:netherite_ingot'
        ]
    ).superheated().id('kubejs:mixing/titanium_alloy')

    // ---------- 3.5 钛锭冶炼：电弧炉路线（补断链） ----------
    // 背景：官方钛锭只有原版熔炉/高炉配方，本包 remove.js 已移除全部 smelting/blasting
    // Create 水洗链（粉碎→水洗→粒→锭）可用但慢，电弧炉作为主路径，对齐彩钢时代
    // arc_furnace_json 为 const/recipeutils/ie.js 全局助手
    event.custom(arc_furnace_json(
        '2x rocketnautics:titanium_ingot',
        'rocketnautics:titanium_ore',
        [],
        400, 102400, true
    )).id('immersiveengineering:arc_furnace/titanium_ingot_from_ore')

    event.custom(arc_furnace_json(
        '2x rocketnautics:titanium_ingot',
        'rocketnautics:deepslate_titanium_ore',
        [],
        400, 102400, true
    )).id('immersiveengineering:arc_furnace/titanium_ingot_from_deepslate_ore')

    event.custom(arc_furnace_json(
        'rocketnautics:titanium_ingot',
        'rocketnautics:raw_titanium',
        [],
        200, 51200
    )).id('immersiveengineering:arc_furnace/titanium_ingot_from_raw')

    event.custom(arc_furnace_json(
        'rocketnautics:titanium_ingot',
        'rocketnautics:crushed_raw_titanium',
        [],
        100, 25600
    )).id('immersiveengineering:arc_furnace/titanium_ingot_from_crushed')

    // ---------- 6. 配方断链修补：本包拿不到的原版材料 ----------
    // 气囊蒙皮：羊毛 → 布料（史实：真实气球/飞艇蒙皮是织物涂胶，不是羊毛）
    // 布料标签 kubejs:balloon_fabric = 粗麻布/羊毛布/丝绸布
    // 产量标定：1 布 + 2 木棍 → 4 气囊（合成）；1 布 + 1 木棍 → 6 气囊（部署器，保留 1.5 倍优势）
    // 羊毛布路线性价比与原羊毛完全一致（2 毛 = 1 布 = 4 气囊），粗麻布走黄麻农田量产
    const AERONAUTICS_ENVELOPE_COLORS = [
        'black', 'blue', 'brown', 'cyan', 'gray', 'green', 'light_blue', 'light_gray',
        'lime', 'magenta', 'orange', 'pink', 'purple', 'red', 'white', 'yellow'
    ]
    AERONAUTICS_ENVELOPE_COLORS.forEach(color => {
        event.remove({ id: `aeronautics:${color}_envelope` })
        event.remove({ id: `aeronautics:deploying/deploying_envelope_${color}` })
        event.shaped(`4x aeronautics:${color}_envelope`, [
            'S',
            'W',
            'S'
        ], {
            S: 'minecraft:stick',
            W: '#kubejs:balloon_fabric'
        }).id(`aeronautics:${color}_envelope`)
        event.custom({
            type: 'create:deploying',
            ingredients: [
                { tag: 'kubejs:balloon_fabric' },
                { item: 'minecraft:stick' }
            ],
            results: [{ count: 6, id: `aeronautics:${color}_envelope` }]
        }).id(`aeronautics:deploying/deploying_envelope_${color}`)
    })

    // Create 风帆：羊毛 → 布料（1 布 + 1 木棍 + 1 安山合金 → 4 帆）
    // 旧 replaceInput 指错了配方 id（create:crafting/white_sail 不存在），一并纠正
    event.remove({ id: 'create:crafting/kinetics/white_sail' })
    event.shaped('4x create:white_sail', [
        'WS',
        'SA'
    ], {
        W: '#kubejs:balloon_fabric',
        S: '#c:rods/wooden',
        A: 'create:andesite_alloy'
    }).id('create:crafting/kinetics/white_sail')

    // 蒸汽喷口：原版铜块 → TFC 铜块（c 标签）
    event.replaceInput({ id: 'aeronautics:steam_vent' }, 'minecraft:copper_block', '#c:storage_blocks/copper')

    // 越野轮胎/土豆炮塔：原版干海带(块) → AFC 橡胶
    event.replaceInput({ mod: 'offroad' }, 'minecraft:dried_kelp', 'afc:rubber_bar')
    event.replaceInput({ mod: 'offroad' }, 'minecraft:dried_kelp_block', 'afc:rubber_bar')
    event.replaceInput({ id: 'aeronautics:mechanical_crafting/mounted_potato_cannon' }, 'minecraft:dried_kelp_block', 'afc:rubber_bar')

    // 便携引擎降配：老配方要TFC高炉+引擎总成，太贵。改成储液罐+鼓风机+6张锻铁薄板
    event.remove({ id: 'simulated:red_portable_engine' })
    event.shaped('simulated:red_portable_engine', [
        'S S',
        'SFS',
        'STS'
    ], {
        S: 'tfc:metal/sheet/wrought_iron',
        F: 'create:encased_fan',
        T: 'create:fluid_tank'
    }).id('kubejs:crafting/red_portable_engine')

    // 吸盘发射器：原版铜锭 → TFC 铜锭（c 标签）
    event.replaceInput({ id: 'simulated:mechanical_crafting/plunger_launcher' }, 'minecraft:copper_ingot', '#c:ingots/copper')

    // ---------- 7. 火箭部件/航天头盔：官方未注册配方，按模组风格补全 ----------
    // 材料：钛板/钛合金板（辊压）、钛机壳（方块贴板）、加固板（粉碎黑曜石）、蓝钢板

    // 推进器支架：发动机与箭体的受力连接件
    event.shaped('rocketnautics:thruster_mount', [
        ' T ',
        'TCT',
        ' T '
    ], {
        T: '#c:plates/titanium_alloy',
        C: 'rocketnautics:titanium_casing'
    }).id('kubejs:crafting/rocketnautics/thruster_mount')

    // 发动机喷管：底部大喇叭
    event.shaped('rocketnautics:engine_nozzle', [
        'SAS',
        'S S',
        'S S'
    ], {
        S: '#c:plates/titanium_alloy',
        A: '#c:plates/obsidian'
    }).id('kubejs:crafting/rocketnautics/engine_nozzle')

    // 发动机管路：燃料输送
    event.shaped('rocketnautics:engine_pipes', [
        'PTP',
        'P P',
        'PTP'
    ], {
        P: 'create:fluid_pipe',
        T: '#c:plates/titanium'
    }).id('kubejs:crafting/rocketnautics/engine_pipes')

    // 软管锚：远程流体网络连接
    event.shaped('rocketnautics:hose_anchor', [
        ' T ',
        'TVT',
        ' I '
    ], {
        T: '#c:plates/titanium',
        V: 'create:fluid_valve',
        I: '#c:ingots/titanium'
    }).id('kubejs:crafting/rocketnautics/hose_anchor')

    // 航天头盔：4 蓝钢板 + 钛合金板 + 玻璃面窗（终局防护，造价对齐彩钢时代）
    event.shaped('rocketnautics:space_helmet', [
        'BTB',
        'BGB'
    ], {
        B: 'tfc:metal/sheet/blue_steel',
        T: '#c:plates/titanium_alloy',
        G: 'minecraft:glass'
    }).id('kubejs:crafting/rocketnautics/space_helmet')

    // ---------- 8. 把手全禁：杜绝人力推拉物理结构 ----------
    // 铁把手/铜把手/16 染色把手是唯一的"徒手挪船"工具，禁掉后移动结构必须走动力正路
    event.remove({ output: /simulated:.*handle.*/ })

    // 冲压机：功能在包内完全用不上（玩家实测"一点用没有"），删配方 + JEI 隐藏（见 jei_cleanup.js）
    event.remove({ output: 'tfc_aeronautics:stamping_press' })

    // 弹簧：原配方用 #c:nuggets/iron，但包内没有任何模组往这个标签注册物品（空标签），
    // 导致弹簧、以及依赖它的履带底座/扭转弹簧/悬挂调节钥匙全部无法合成。
    // TFC 1.21 没有金属粒，换成 TFC 锻铁杆（弹簧本来就是卷杆，物理上也说得通）
    event.replaceInput({ id: 'simulated:spring' }, '#c:nuggets/iron', 'tfc:metal/rod/wrought_iron')

    // 光学传感器：原版紫水晶碎片 → TFC 紫水晶
    event.replaceInput({ id: 'simulated:optical_sensor' }, 'minecraft:amethyst_shard', 'tfc:gem/amethyst')

    // 高度传感器/结构图纸/名牌：原版纸 → TFC 未精制纸
    event.replaceInput({ mod: 'simulated' }, 'minecraft:paper', 'tfc:unrefined_paper')

    // 绳索连接器发射器/固定式绳索发射器：皓蓝石半砖（Create 装饰石，群峦世界不生成）→ 群峦平滑石半砖
    event.replaceInput(
        { mod: 'create_aeronautics_throwable_rope_connector' },
        'create:polished_cut_asurine_slab',
        '#c:stones/smooth_slabs'
    )
})
