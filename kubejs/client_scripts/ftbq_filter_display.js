// FTB Quests 过滤器任务图标轮播修复
// 原理：FTB Quests 的过滤器任务图标(AnimatedIcon)轮播数据源是创造模式搜索栏物品列表;
// 部分模组(如 xercamusic 乐器)未注册任何创造模式标签页,其物品不进搜索栏,
// 导致过滤器匹配不到可显示物品,任务图标退化为过滤器物品/缺失贴图。
// 本脚本通过 ftb-xmod-compat 提供的 customFilterItem 事件,把任务书全部
// smart_filter 引用的物品注入 FTB Quests 的额外显示物品池(extraCache),
// 由各过滤器自身的 matcher 认领,从而恢复图标轮播。
// 物品清单由 audit_filters.py 从 config/ftbquests/quests/chapters 全量提取(200项),
// 修改任务书过滤器后需重新生成。
FTBQuestsEvents.customFilterItem(event => {
	const displayItems = [
		'cold_sweat:goat_fur', 'firmalife:bonsai_planter', 'firmalife:food/chocolate_chip_cookie', 'firmalife:food/chocolate_ice_cream', 'firmalife:food/cooked_pie', 'firmalife:food/hardtack',
		'firmalife:food/strawberry_ice_cream', 'firmalife:food/sugar_cookie', 'firmalife:food/vanilla_ice_cream', 'firmalife:hanging_planter', 'firmalife:hydroponic_planter', 'firmalife:large_planter',
		'firmalife:plant/cocoa_sapling', 'firmalife:plant/fig_sapling', 'firmalife:plant/nightshade_bush', 'firmalife:plant/pineapple_bush', 'firmalife:quad_planter', 'firmalife:trellis_planter',
		'firmalife:vat', 'kaleidoscope_tavern:barrel', 'kaleidoscope_tavern:empty_bottle', 'kaleidoscope_tavern:pressing_tub', 'kaleidoscope_tavern:trellis', 'kaleidoscopetfctavern:grapevine_locator',
		'kaleidoscopetfctavern:purple_wine', 'kaleidoscopetfctavern:red_wine', 'kaleidoscopetfctavern:white_wine', 'minecraft:pumpkin_pie', 'rnr:brick_road', 'rnr:brick_road_slab',
		'rnr:brick_road_stairs', 'tfc:gem/amethyst', 'tfc:gem/diamond', 'tfc:gem/emerald', 'tfc:gem/lapis_lazuli', 'tfc:gem/opal',
		'tfc:gem/pyrite', 'tfc:gem/ruby', 'tfc:gem/sapphire', 'tfc:gem/topaz', 'tfc:metal/anvil/bismuth_bronze', 'tfc:metal/anvil/black_bronze',
		'tfc:metal/anvil/bronze', 'tfc:metal/double_ingot/bismuth_bronze', 'tfc:metal/double_ingot/black_bronze', 'tfc:metal/double_ingot/bronze', 'tfc:ore/normal_bismuthinite', 'tfc:ore/normal_cassiterite',
		'tfc:ore/normal_native_gold', 'tfc:ore/normal_native_silver', 'tfc:ore/normal_sphalerite', 'tfc:ore/poor_bismuthinite', 'tfc:ore/poor_cassiterite', 'tfc:ore/poor_native_gold',
		'tfc:ore/poor_native_silver', 'tfc:ore/poor_sphalerite', 'tfc:ore/rich_bismuthinite', 'tfc:ore/rich_cassiterite', 'tfc:ore/rich_native_gold', 'tfc:ore/rich_native_silver',
		'tfc:ore/rich_sphalerite', 'tfc:ore/small_bismuthinite', 'tfc:ore/small_cassiterite', 'tfc:ore/small_malachite', 'tfc:ore/small_native_copper', 'tfc:ore/small_native_gold',
		'tfc:ore/small_native_silver', 'tfc:ore/small_sphalerite', 'tfc:ore/small_tetrahedrite', 'tfc:plant/banana_sapling', 'tfc:plant/blackberry_bush', 'tfc:plant/blueberry_bush',
		'tfc:plant/bunchberry_bush', 'tfc:plant/cherry_sapling', 'tfc:plant/cloudberry_bush', 'tfc:plant/cranberry_bush', 'tfc:plant/elderberry_bush', 'tfc:plant/gooseberry_bush',
		'tfc:plant/green_apple_sapling', 'tfc:plant/lemon_sapling', 'tfc:plant/olive_sapling', 'tfc:plant/orange_sapling', 'tfc:plant/peach_sapling', 'tfc:plant/plum_sapling',
		'tfc:plant/raspberry_bush', 'tfc:plant/red_apple_sapling', 'tfc:plant/snowberry_bush', 'tfc:plant/strawberry_bush', 'tfc:plant/wintergreen_berry_bush', 'tfc:powder/native_copper',
		'tfc:rock/bricks/andesite', 'tfc:rock/bricks/basalt', 'tfc:rock/bricks/chalk', 'tfc:rock/bricks/chert', 'tfc:rock/bricks/claystone', 'tfc:rock/bricks/conglomerate',
		'tfc:rock/bricks/dacite', 'tfc:rock/bricks/diorite', 'tfc:rock/bricks/dolomite', 'tfc:rock/bricks/gabbro', 'tfc:rock/bricks/gneiss', 'tfc:rock/bricks/granite',
		'tfc:rock/bricks/limestone', 'tfc:rock/bricks/marble', 'tfc:rock/bricks/phyllite', 'tfc:rock/bricks/quartzite', 'tfc:rock/bricks/rhyolite', 'tfc:rock/bricks/schist',
		'tfc:rock/bricks/shale', 'tfc:rock/bricks/slate', 'tfc:rock/bricks/tuff', 'tfc:rock/raw/andesite', 'tfc:rock/raw/basalt', 'tfc:rock/raw/chalk',
		'tfc:rock/raw/chert', 'tfc:rock/raw/claystone', 'tfc:rock/raw/conglomerate', 'tfc:rock/raw/dacite', 'tfc:rock/raw/diorite', 'tfc:rock/raw/dolomite',
		'tfc:rock/raw/gabbro', 'tfc:rock/raw/gneiss', 'tfc:rock/raw/granite', 'tfc:rock/raw/limestone', 'tfc:rock/raw/marble', 'tfc:rock/raw/phyllite',
		'tfc:rock/raw/quartzite', 'tfc:rock/raw/rhyolite', 'tfc:rock/raw/schist', 'tfc:rock/raw/shale', 'tfc:rock/raw/slate', 'tfc:rock/raw/tuff',
		'tfc:rock/smooth/andesite', 'tfc:rock/smooth/basalt', 'tfc:rock/smooth/chalk', 'tfc:rock/smooth/chert', 'tfc:rock/smooth/claystone', 'tfc:rock/smooth/conglomerate',
		'tfc:rock/smooth/dacite', 'tfc:rock/smooth/diorite', 'tfc:rock/smooth/dolomite', 'tfc:rock/smooth/gabbro', 'tfc:rock/smooth/gneiss', 'tfc:rock/smooth/granite',
		'tfc:rock/smooth/limestone', 'tfc:rock/smooth/marble', 'tfc:rock/smooth/phyllite', 'tfc:rock/smooth/quartzite', 'tfc:rock/smooth/rhyolite', 'tfc:rock/smooth/schist',
		'tfc:rock/smooth/shale', 'tfc:rock/smooth/slate', 'tfc:rock/smooth/tuff', 'tfc:stone/axe/igneous_extrusive', 'tfc:stone/axe/igneous_intrusive', 'tfc:stone/axe/metamorphic',
		'tfc:stone/axe/sedimentary', 'tfc:stone/hammer/igneous_extrusive', 'tfc:stone/hammer/igneous_intrusive', 'tfc:stone/hammer/metamorphic', 'tfc:stone/hammer/sedimentary', 'tfc:stone/hoe/igneous_extrusive',
		'tfc:stone/hoe/igneous_intrusive', 'tfc:stone/hoe/metamorphic', 'tfc:stone/hoe/sedimentary', 'tfc:stone/javelin/igneous_extrusive', 'tfc:stone/javelin/igneous_intrusive', 'tfc:stone/javelin/metamorphic',
		'tfc:stone/javelin/sedimentary', 'tfc:stone/knife/igneous_extrusive', 'tfc:stone/knife/igneous_intrusive', 'tfc:stone/knife/metamorphic', 'tfc:stone/knife/sedimentary', 'tfc:stone/knife_head/igneous_extrusive',
		'tfc:stone/knife_head/igneous_intrusive', 'tfc:stone/knife_head/metamorphic', 'tfc:stone/knife_head/sedimentary', 'tfc:stone/shovel/igneous_extrusive', 'tfc:stone/shovel/igneous_intrusive', 'tfc:stone/shovel/metamorphic',
		'tfc:stone/shovel/sedimentary', 'tfc:wooden_bucket', 'xercamusic:banjo', 'xercamusic:bass_guitar', 'xercamusic:cello', 'xercamusic:cymbal',
		'xercamusic:drum', 'xercamusic:flute', 'xercamusic:french_horn', 'xercamusic:god', 'xercamusic:guitar', 'xercamusic:lyre',
		'xercamusic:oboe', 'xercamusic:redstone_guitar', 'xercamusic:sansula', 'xercamusic:saxophone', 'xercamusic:trumpet', 'xercamusic:tubular_bell',
		'xercamusic:violin', 'xercamusic:xylophone',
	]
	displayItems.forEach(id => event.addStack(Item.of(id)))
})
