// 修复：小矿石粒（tfc:ore/small_*，地表放置形态）在水中的木桶复制漏洞
// 复现：把矿物粒放进水源，再用木桶向该格倒水，会凭空多出一个矿物粒。
// 手段：拦截对小矿石粒方块的木桶交互（盛水/倒水都算），从源头切断复现路径。
// 该交互本来就没有正当用途（不需要给矿石粒浇水），封禁无副作用。
BlockEvents.rightClicked(event => {
    try {
        let block = event.block
        if (!block) return
        if (String(block.id).indexOf('tfc:ore/small_') !== 0) return
        let item = event.item
        if (item && String(item.id) === 'tfc:wooden_bucket') {
            event.cancel()
        }
    } catch (e) {
        console.error('[ore_dupe_guard] ' + e)
    }
})

// 双保险：盛水（FillBucketEvent）若射线命中的是小矿石粒所在格，同样取消
// 注意：NeoForge 1.21.1 已移除 FillBucketEvent（流体交互改走 capability 体系），
// 用 tryLoadClass 软探测——类不存在时静默跳过，靠第一层 BlockEvents 拦截兜底。
let FillBucketEventClass = Java.tryLoadClass('net.neoforged.neoforge.event.entity.player.FillBucketEvent')
if (FillBucketEventClass) {
    NativeEvents.onEvent(FillBucketEventClass, event => {
        try {
            let target = event.target
            if (!target) return
            let pos = target.blockPos
            if (!pos) return
            let state = event.level.getBlockState(pos)
            // Block.toString() 形如 "Block{tfc:ore/small_copper}"
            if (state && String(state.block).indexOf('tfc:ore/small_') !== -1) {
                event.setCanceled(true)
            }
        } catch (e) {
            console.error('[ore_dupe_guard] ' + e)
        }
    })
}
