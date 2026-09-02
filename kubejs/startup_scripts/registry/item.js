StartupEvents.registry('item', event => {
	//增加锻铁中间体
	event.create('kubejs:hot_iron_bloom')
	.texture('kubejs:item/hot_iron_bloom')

	//增加炼钢中间体
	event.create('hot_high_carbon_steel')
	.texture('kubejs:item/hot_high_carbon_steel')

	// tfcr 自定义物品（3.2 迁移恢复，任务线与配方均引用）

	// 烧结铝土矿砖
	event.create('tfcr:roasted_brick/bauxite')
	.texture('kubejs:item/roasted_brick_bauxite')

	// 高岭土烧结块和粗块
	event.create('tfcr:roasted_kaolin_clay')
	.texture('kubejs:item/roasted_kaolin_clay')
	event.create('tfcr:raw_kaolin_clay')
	.texture('kubejs:item/raw_kaolin_clay')

	// 高岭土精制粉
	event.create('tfcr:roasted/bauxite')
	.texture('kubejs:item/roasted_bauxite')

	// 蓝钢罐头
	event.create('tfcr:blue_steelcan1')
	.texture('kubejs:item/blue_steelcan1')

	event.create('tfcr:blue_steelcan0')
	.texture('kubejs:item/blue_steelcan0')

	event.create('tfcr:blue_steelcan2')
	.texture('kubejs:item/blue_steelcan2')

	event.create('tfcr:blue_steelcan3')
	.texture('kubejs:item/blue_steelcan3')

	// 木齿轮
	event.create('tfcr:wooden_cogwheel')
	.texture('kubejs:item/wooden_cogwheel')

	// 信息时代奖励袋
	event.create('tfcr:lootbag_information_age')
	.texture('kubejs:item/information_age')

	// 种子奖励袋
	event.create('tfcr:seed')
	.texture('kubejs:item/seed')
})
