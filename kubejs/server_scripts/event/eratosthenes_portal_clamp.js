// Eratosthenes 地图投影世界生成只在有效范围内工作。
// 玩家从下界（或其他维度）返回主世界时，原版传送门逻辑按坐标映射计算落点，
// 一旦落点 |x| 或 |z| 超出投影有效范围（约 ±20000），在界外生成区块会把世界生成卡死。
// 这里拦截跨维度传送：预测落点超出安全范围时取消原版传送，改为钳制落点后手动传送。
NativeEvents.onEvent('net.neoforged.neoforge.event.entity.EntityTravelToDimensionEvent', event => {
    try {
        let entity = event.entity
        // 只处理玩家（ServerPlayer）。KJS7 的 Rhino 禁止调 getClass()，用 instanceof 判定
        if (!entity) return
        let PlayerClass = Java.loadClass('net.minecraft.world.entity.player.Player')
        if (!(entity instanceof PlayerClass)) return

        let toId = String(event.dimension.location())
        if (toId !== 'minecraft:overworld') return

        // 坐标映射：下界↔主世界为 1:8，其余维度（如火箭学月球）按 1:1
        let fromId = String(entity.level.dimension.location())
        let scale = fromId === 'minecraft:the_nether' ? 8 : 1

        let tx = entity.x * scale
        let tz = entity.z * scale

        const LIMIT = 19500
        if (Math.abs(tx) <= LIMIT && Math.abs(tz) <= LIMIT) return

        // 取消原版传送，改为钳制后的安全落点
        event.setCanceled(true)

        let cx = Math.max(-LIMIT, Math.min(LIMIT, Math.round(tx)))
        let cz = Math.max(-LIMIT, Math.min(LIMIT, Math.round(tz)))

        // 手动找地表：从高处往下找第一个非空气方块
        // 注意：NativeEvents 里拿到的是原生对象，没有 KJS 包装方法（getBlock/getLevel(String) 都不可用）
        let LevelKeys = Java.loadClass('net.minecraft.world.level.Level')
        let BlockPos = Java.loadClass('net.minecraft.core.BlockPos')
        let mcServer = Utils.getServer()
        let level = mcServer.getLevel(LevelKeys.OVERWORLD)
        let gy = 80
        for (let y = 260; y > -60; y--) {
            let state = level.getBlockState(new BlockPos(cx, y, cz))
            if (state && !state.isAir()) {
                gy = y + 1
                break
            }
        }

        // 用命令传送：不触发跨维度事件，避免递归；玩家离开下界传送门后不会重复触发
        let uuid = entity.getStringUUID()
        mcServer.getCommands().performPrefixedCommand(
            mcServer.createCommandSourceStack(),
            `execute in minecraft:overworld run tp ${uuid} ${cx + 0.5} ${gy} ${cz + 0.5}`
        )
        try {
            entity.sendSystemMessage(Text.gold('投影边界之外没有可落脚的陆地，你被安全地传送回了世界边缘。'))
        } catch (ignored) {}
    } catch (e) {
        console.error('[eratosthenes_portal_clamp] ' + e)
    }
})
