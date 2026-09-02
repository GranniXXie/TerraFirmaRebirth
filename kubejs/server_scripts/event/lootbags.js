//种子奖励袋 - tfcr item removed
// ItemEvents.rightClicked('tfcr:seed', event => {
//     const { player, item } = event

//     item.shrink(1)

//     // 配置区域：可自定义概率和物品
//     const rewards = [
//         { item: 'tfc:seeds/jute', count: 1, weight: 0.05 },
//         { item: 'tfc:seeds/carrot', count: 1, weight: 0.01 },
//         { item: 'tfc:seeds/tomato', count: 1, weight: 0.01 },
//         { item: 'tfc:seeds/potato', count: 1, weight: 0.01 },
//         { item: 'tfc:seeds/cabbage', count: 1, weight: 0.05 },
//         { item: 'tfc:seeds/onion', count: 1, weight: 0.05 },
//         { item: 'tfc:seeds/garlic', count: 1, weight: 0.05 },
//         { item: 'tfc:seeds/papyrus', count: 1, weight: 0.01 },
//         { item: 'tfc:seeds/rice', count: 1, weight: 0.05 },
//         { item: 'tfc:plant/olive_sapling', count: 1, weight: 0.05 },
//         { item: 'tfc:plant/red_apple_sapling', count: 1, weight: 0.05 },
//         { item: "immersiveengineering:seed", count: 1, weight: 0.05 },
//         { item: 'tfc:plant/cranberry_bush', count: 1, weight: 0.05 },
//         { item: 'minecraft:bamboo', count: 1, weight: 0.01 },
//         { item: 'textile:seeds/cotton', count: 1, weight: 0.05 },
//     ]

//     // 计算总权重
//     const totalWeight = rewards.reduce((sum, reward) => sum + reward.weight, 0)
    
//     // 生成随机选择
//     const random = Math.random() * totalWeight
//     let weightSum = 0
    
//     for (const reward of rewards) {
//         weightSum += reward.weight
//         if (random <= weightSum) {
//             // 给予选中物品
//             player.give(Item.of(reward.item, reward.count))
//             break
//         }
//     }
// })
