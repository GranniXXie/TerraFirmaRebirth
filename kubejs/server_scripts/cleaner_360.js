// ============================================================
// 群峦星360安全卫士 —— 定时清理掉落物
// 每 2 小时清理一次掉落物，清理前 60s / 30s / 10s / 5s 聊天栏广播提醒
// ============================================================

var GUARD_NAME = '[群峦星360安全卫士] '
var CLEAR_INTERVAL = 144000 // 2小时 = 2 * 60 * 60 * 20 tick
var WARNINGS = [
    [1200, '60秒'],
    [600, '30秒'],
    [200, '10秒'],
    [100, '5秒']
]
var cleanerTick = 0

// 向全体玩家发送聊天消息（前缀青色加粗 + 正文指定颜色）
function guardTell(server, msg, color) {
    try {
        server.players.forEach(function (p) {
            p.tell(Text.aqua(GUARD_NAME).bold(true).append(Text[color](msg).bold(false)))
        })
    } catch (err) {
        console.error('[360卫士] 广播失败: ' + err)
    }
}

ServerEvents.tick(function (event) {
    cleanerTick++
    var pos = cleanerTick % CLEAR_INTERVAL
    var remain = CLEAR_INTERVAL - pos

    // 到点清理：遍历所有维度的掉落物实体，逐一 discard 并计数
    // 注意：level.getEntities() 返回 LevelEntityGetter（不可迭代），必须用 ServerLevel.getAllEntities()
    //（kill 命令的返回值不可靠，会永远显示 0）
    // KJS7(2101.7.x) 正确取法：event.server 即 MinecraftServer，用原生 getAllLevels()
    // （event.server.levels 不存在；Utils.getServer() 也不存在——UtilsWrapper 没这个方法）
    if (pos === 0) {
        var count = 0
        try {
            var ItemEntityClass = Java.loadClass('net.minecraft.world.entity.item.ItemEntity')
            var levelIt = event.server.getAllLevels().iterator()
            while (levelIt.hasNext()) {
                var level = levelIt.next()
                try {
                    var entityIt = level.getAllEntities().iterator()
                    while (entityIt.hasNext()) {
                        var e = entityIt.next()
                        if (e && e instanceof ItemEntityClass && e.isAlive()) {
                            e.discard()
                            count++
                        }
                    }
                } catch (err2) {
                    console.error('[360卫士] 清理维度 ' + level.dimension().location() + ' 时出错: ' + err2)
                }
            }
        } catch (err) {
            console.error('[360卫士] 清理掉落物时出错: ' + err)
        }
        guardTell(event.server, '已清理 ' + count + ' 个掉落物，世界更清爽了！', 'green')
        console.info('[360卫士] 本次清理掉落物: ' + count + ' 个')
        return
    }

    // 倒计时提醒
    for (var i = 0; i < WARNINGS.length; i++) {
        if (remain === WARNINGS[i][0]) {
            guardTell(event.server, '掉落物清理将于 ' + WARNINGS[i][1] + ' 后进行，请及时拾取重要物品！', 'yellow')
        }
    }
})
