ServerEvents.tags('fluid', event => {
    // 宇航学火箭燃料：沉浸工程生物燃油
    // 宇航学燃料机制 = rocketnautics:rocket_fuel 流体标签，进标签即可用，消耗速率由模组配置统一控制
    // 火箭不能用岩浆（从标签移除），只能烧正经燃料
    event.remove('rocketnautics:rocket_fuel', 'minecraft:lava')
    event.add('rocketnautics:rocket_fuel', [
        'immersiveengineering:biodiesel',
        'immersiveengineering:high_power_biodiesel'
    ])

    // 木桶可盛装的流体扩充（TFC 默认只放行 ingredients 标签里的食用流体）
    // 主要是引擎燃料类，玩家需要桶装转移给便携引擎/喷气背包加注
    event.add('tfc:usable_in_wooden_bucket', [
        'create:honey',
        'immersiveengineering:biodiesel',
        'immersiveengineering:high_power_biodiesel',
        'immersiveengineering:ethanol',
        'immersiveengineering:plantoil',
        'immersiveengineering:creosote',
        // 电力学油类：变压器油/植物油 允许木桶盛装、大桶储存（玩家反馈装不了）
        'electroenergetics:transformer_oil',
        'electroenergetics:plant_oil',
        // 浮空石混合液：结晶前要倒在地上靠近热源催化，没桶根本倒不出来（玩家反馈）
        'aeronautics:levitite_blend'
    ])
    event.add('tfc:usable_in_barrel', [
        'electroenergetics:transformer_oil',
        'electroenergetics:plant_oil'
    ])

    // 酵种液容器扩充：大缸/锅/搅拌碗（firmalife 的 vat/mixing_bowl 标签都桥接 tfc:usable_in_pot），
    // 以及陶壶（只进 usable_in_jug 白名单，不进 drinkables，拿得起喝不了）
    event.add('tfc:usable_in_pot', 'firmalife:yeast_starter')
    event.add('tfc:usable_in_jug', 'firmalife:yeast_starter')
    event.add('tfc:usable_in_barrel', 'firmalife:yeast_starter')

    // 通用奶标签：终端消费配方（蛋糕/派/奶饮等）接受三种鲜奶
    // 凝乳/奶醋产业链按奶种区分，不走此标签，绝不要把凝乳奶/椰奶加进来
    event.add('kubejs:milks', [
        'minecraft:milk',
        'firmalife:yak_milk',
        'firmalife:goat_milk'
    ])
})
