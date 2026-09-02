ItemEvents.modifyTooltips(event =>{
    // tfcr tooltip removed - mod not installed
    // event.add("tfcr:blue_steelcan0", Text.of("右键打开,获得8个群峦员工能量棒"))

    event.add("immersiveengineering:crate", Text.of("破坏不掉落内部物品 / Does not drop its contents when broken"))

    // KubeJS 1.21 中 addAdvanced 已移除，用静态多行 tooltip 替代
    event.add('tfcr:seed', [
        Text.of("右键打开，抽取一个种子。 / Right-click to open and draw a seed."),
        Text.of("奖励列表 / Rewards:"),
        Text.of("10%：胡萝卜种子，马铃薯种子，西红柿种子，竹子，纸莎草种子 / 10%: carrot, potato, tomato seeds; bamboo; papyrus seeds"),
        Text.of("5%：黄麻种子，卷心菜种子，洋葱种子，大蒜种子，水稻种子，橄榄树，红苹果树，工业大麻种子，蔓越莓灌木，棉花种子 / 5%: jute, cabbage, onion, garlic, rice seeds; olive & red apple trees; hemp seeds; cranberry bush; cotton seeds")
    ])

    event.add("cold_sweat:goat_fur", Text.gray("通过击杀山羊获得 / Obtained by hunting goats"))

    // 劣等合金惩罚机制的产物说明：合金窑里那些"XX→未知锭"的配方只在投入劣等锭时触发，JEI 看不出组件条件
    event.add("tfc:metal/ingot/unknown", [
        Text.gold(Text.translate("tooltip.kubejs.unknown_ingot.0")),
        Text.gray(Text.translate("tooltip.kubejs.unknown_ingot.1"))
    ])
})
