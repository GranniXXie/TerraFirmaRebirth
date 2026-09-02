// 原版世界边界初始化：新存档首次加载时把主世界边界设为中心 (0,0)、直径 84000（X/Z 各 ±42000）
// 注意：原版 worldborder 只支持正方形，无法 X/Z 分开设；±42000 已覆盖真实世界模组的经度范围
// 仅在边界仍是默认值（59999968）时设置，玩家/腐竹手动调过的不覆盖
ServerEvents.loaded(event => {
    const overworld = event.server.overworld()
    const border = overworld.getWorldBorder()
    if (Math.abs(border.getSize() - 59999968.0) < 1.0) {
        event.server.runCommandSilent('worldborder center 0 0')
        event.server.runCommandSilent('worldborder set 84000')
        console.info('[TFCR] 检测到默认世界边界，已设置为 ±42000（原版边界，仅首次生效）')
    }
})
