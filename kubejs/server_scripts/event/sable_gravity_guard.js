// 禁止把群峦重力方块堆到航空学物理结构上
// 场景1（组装阶段）由 kubejs/data/simulated/tags/block/non_movable.json 拦截
// 本脚本负责场景2（已物理化的结构上直接放置）：sable 把所有物理结构的方块存放在
// 主世界 2000 万格以外的 Plot 区域，放置事件中的坐标即 Plot 坐标，按此识别
// 注意：KJS 的 Rhino 在 NativeEvents 回调内声明局部 const/let 会报 redeclaration 错误，
// 本回调内禁止任何局部变量声明，只用表达式

const $EntityPlaceEvent = Java.loadClass('net.neoforged.neoforge.event.level.BlockEvent$EntityPlaceEvent')
const $TagKey = Java.loadClass('net.minecraft.tags.TagKey')
const $Registries = Java.loadClass('net.minecraft.core.registries.Registries')
const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const $ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer')
const $Component = Java.loadClass('net.minecraft.network.chat.Component')

const TAG_LANDSLIDE = $TagKey.create($Registries.BLOCK, $ResourceLocation.fromNamespaceAndPath('tfc', 'can_landslide'))
const TAG_COLLAPSE = $TagKey.create($Registries.BLOCK, $ResourceLocation.fromNamespaceAndPath('tfc', 'can_collapse'))
const TAG_DIRT = $TagKey.create($Registries.BLOCK, $ResourceLocation.fromNamespaceAndPath('tfc', 'dirt'))

// can_landslide 与 tfc:dirt 两个标签未覆盖的重力方块（草方块/黏土草/草径/黏土/泥炭等）
const SOIL_TYPES = ['entisol', 'aridisol', 'oxisol', 'fluvisol', 'andisol', 'podzol', 'alfisol', 'mollisol']
const EXTRA_GRAVITY = new Set(['tfc:peat', 'tfc:peat_grass', 'tfc:kaolin_clay_grass', 'minecraft:sand', 'minecraft:red_sand', 'minecraft:gravel'])
for (const fam of ['grass', 'clay_grass', 'grass_path', 'clay', 'muddy_roots']) {
    for (const soil of SOIL_TYPES) EXTRA_GRAVITY.add(`tfc:${fam}/${soil}`)
}
// 机械动力物品保险库：物理化后会概率生成实体副本（拆掉双倍获取），
// 组装阶段由 kubejs/data/simulated/tags/block/non_movable.json 拦截，
// 这里拦截"已物理化结构上直接放置"的第二条路
EXTRA_GRAVITY.add('create:item_vault')

NativeEvents.onEvent($EntityPlaceEvent, function (e) {
    try {
        if (Math.abs(e.getPos().getX()) < 20000000 && Math.abs(e.getPos().getZ()) < 20000000) return
        if (e.getPlacedBlock().is(TAG_LANDSLIDE) || e.getPlacedBlock().is(TAG_COLLAPSE) || e.getPlacedBlock().is(TAG_DIRT) || EXTRA_GRAVITY.has('' + e.getPlacedBlock().getBlock().builtInRegistryHolder().key().location())) {
            e.setCanceled(true)
            if (e.getEntity() !== null && e.getEntity() instanceof $ServerPlayer) {
                e.getEntity().sendSystemMessage($Component.literal('\u00A7c\u8FD9\u4E2A\u65B9\u5757\u4E0D\u80FD\u88AB\u7269\u7406\u5316\uFF01 / This block cannot be physicalized!'), true)
            }
            console.info('[重力拦截] 已取消在物理结构上放置: ' + e.getPlacedBlock().getBlock().builtInRegistryHolder().key().location())
        }
    } catch (err) {
        console.error('[重力拦截] 出错: ' + err)
    }
})
