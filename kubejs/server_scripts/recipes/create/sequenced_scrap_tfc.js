ServerEvents.recipes(event => {
    // ============ 序列组装随机废料 TFC 化 ============
    // 原版废料（铁粒/铁栏杆/铁头盔/铁锭/钟/金粒）在本包要么无来源要么无意义，
    // 替换为同价值的群峦金属小件。主产物与其余产物、概率全部保持原样。

    // ---------- 引擎总成 ----------
    // 便携引擎已改为直接合成（aerospace.js），引擎总成不再有任何用途。
    // 整条序列组装配方删除，避免玩家白费八轮材料造出无用件。
    event.remove({ id: 'simulated:sequenced_assembly/engine_assembly' })

    // ---------- 精密构件（金/黄铜主题废料） ----------
    // 金粒→金杆，铁锭→锻铁锭，钟→黄铜杆
    event.remove({ id: 'create:sequenced_assembly/precision_mechanism' })
    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": { "tag": "c:plates/gold" },
        "loops": 5,
        "results": [
            { "chance": 120.0, "id": "create:precision_mechanism" },
            { "chance": 8.0, "id": "create:golden_sheet" },
            { "chance": 8.0, "id": "create:andesite_alloy" },
            { "chance": 5.0, "id": "create:cogwheel" },
            { "chance": 3.0, "id": "tfc:metal/rod/gold" },
            { "chance": 2.0, "id": "create:shaft" },
            { "chance": 2.0, "id": "create:crushed_raw_gold" },
            { "id": "tfc:metal/ingot/wrought_iron" },
            { "id": "tfc:metal/rod/brass" }
        ],
        "sequence": [
            {
                "type": "create:deploying",
                "ingredients": [
                    { "item": "create:incomplete_precision_mechanism" },
                    { "item": "create:cogwheel" }
                ],
                "results": [ { "id": "create:incomplete_precision_mechanism" } ]
            },
            {
                "type": "create:deploying",
                "ingredients": [
                    { "item": "create:incomplete_precision_mechanism" },
                    { "item": "create:large_cogwheel" }
                ],
                "results": [ { "id": "create:incomplete_precision_mechanism" } ]
            },
            {
                "type": "create:deploying",
                "ingredients": [
                    { "item": "create:incomplete_precision_mechanism" },
                    { "tag": "c:nuggets/iron" }
                ],
                "results": [ { "id": "create:incomplete_precision_mechanism" } ]
            }
        ],
        "transitional_item": { "id": "create:incomplete_precision_mechanism" }
    }).id('create:sequenced_assembly/precision_mechanism')

    // ---------- 控制芯片（create_connected） ----------
    // 金粒→金杆；红石、石英、指南针包内都有来源，保留
    event.remove({ id: 'create_connected:sequenced_assembly/control_chip' })
    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": { "item": "create:golden_sheet" },
        "loops": 3,
        "results": [
            { "chance": 120.0, "id": "create_connected:control_chip" },
            { "chance": 8.0, "id": "minecraft:redstone" },
            { "chance": 8.0, "id": "create:electron_tube" },
            { "chance": 5.0, "id": "create:golden_sheet" },
            { "chance": 3.0, "id": "tfc:metal/rod/gold" },
            { "chance": 2.0, "id": "create:iron_sheet" },
            { "chance": 2.0, "id": "create:crushed_raw_gold" },
            { "id": "minecraft:quartz" },
            { "id": "minecraft:compass" }
        ],
        "sequence": [
            {
                "type": "create:deploying",
                "ingredients": [
                    { "item": "create_connected:incomplete_control_chip" },
                    { "item": "create:electron_tube" }
                ],
                "results": [ { "id": "create_connected:incomplete_control_chip" } ]
            },
            {
                "type": "create:deploying",
                "ingredients": [
                    { "item": "create_connected:incomplete_control_chip" },
                    { "item": "minecraft:redstone" }
                ],
                "results": [ { "id": "create_connected:incomplete_control_chip" } ]
            },
            {
                "type": "create:pressing",
                "ingredients": [ { "item": "create_connected:incomplete_control_chip" } ],
                "results": [ { "id": "create_connected:incomplete_control_chip" } ]
            }
        ],
        "transitional_item": { "id": "create_connected:incomplete_control_chip" }
    }).id('create_connected:sequenced_assembly/control_chip')

    // ---------- 陀螺仪构件 ----------
    // 黄铜粒→群峦黄铜杆，碎铁→锻铁杆；结构与概率按原样
    event.remove({ id: 'simulated:sequenced_assembly/gyroscopic_mechanism' })
    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": { "item": "create:iron_sheet" },
        "loops": 5,
        "results": [
            { "chance": 200.0, "id": "simulated:gyroscopic_mechanism" },
            { "chance": 8.0, "id": "create:iron_sheet" },
            { "chance": 8.0, "id": "create:andesite_alloy" },
            { "chance": 3.0, "id": "tfc:metal/rod/brass" },
            { "chance": 2.0, "id": "tfc:metal/rod/wrought_iron" },
            { "id": "minecraft:compass" }
        ],
        "sequence": [
            {
                "type": "create:deploying",
                "ingredients": [
                    { "item": "simulated:incomplete_gyroscopic_mechanism" },
                    { "item": "create:cogwheel" }
                ],
                "results": [ { "id": "simulated:incomplete_gyroscopic_mechanism" } ]
            },
            {
                "type": "create:deploying",
                "ingredients": [
                    { "item": "simulated:incomplete_gyroscopic_mechanism" },
                    { "item": "create:shaft" }
                ],
                "results": [ { "id": "simulated:incomplete_gyroscopic_mechanism" } ]
            },
            {
                "type": "create:deploying",
                "ingredients": [
                    { "item": "simulated:incomplete_gyroscopic_mechanism" },
                    { "item": "tfc:metal/rod/brass" }
                ],
                "results": [ { "id": "simulated:incomplete_gyroscopic_mechanism" } ]
            }
        ],
        "transitional_item": { "id": "simulated:incomplete_gyroscopic_mechanism" }
    }).id('simulated:sequenced_assembly/gyroscopic_mechanism')
})
