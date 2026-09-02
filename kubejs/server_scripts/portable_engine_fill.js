// 便携引擎：手工灌燃料 + 液体燃料点火
// 背景一：引擎本体只认原版岩浆桶（把桶当整件燃料烧），群峦木桶/金属桶装的流体一概不收。
// 背景二：液体燃料模组（portable_engine_liquid_fuel）虽然给引擎加了流体储罐，
//         但它负责"抽燃料→写燃烧时间"的那一段在本环境实际不生效：
//         储罐里的燃料会被每 tick 抽走 1000mB，燃烧时间却始终为 0，引擎永远点不着。
// 所以这里把整条链路接管过来：
//   1. 右键引擎把容器里的有效燃料灌进储罐（返空桶）；
//   2. 点火与续烧由本脚本通过引擎自带的公开接口（setCurrentBurnTime 等）维护，
//      不再依赖模组那段失效的自动点火。

// 与 kubejs/data/portable_engine_liquid_fuel/data_maps 里的数值保持一致
const PE_FUELS = {
    'minecraft:lava': { ticks: 20000, sup: false },
    'immersiveengineering:biodiesel': { ticks: 40000, sup: false },
    'immersiveengineering:high_power_biodiesel': { ticks: 40000, sup: true }
}
const PE_WATCH_KEY = 'peFuelWatch'

function peWatchList(server) {
    let s = ''
    try { s = server.persistentData.getString(PE_WATCH_KEY) } catch (e) { s = '' }
    if (!s) return []
    return s.split(';').filter(x => x.length > 0)
}

function peWatchSave(server, arr) {
    server.persistentData.putString(PE_WATCH_KEY, arr.join(';'))
}

function peWatchAdd(server, entry) {
    let arr = peWatchList(server)
    if (arr.indexOf(entry) < 0) {
        arr.push(entry)
        peWatchSave(server, arr)
    }
}

// 从储罐抽 1000mB 折成燃烧时间（累加，不覆盖），返回是否成功
function peIgnite(be, tank) {
    let fluid = tank.getFluid()
    if (!fluid || fluid.isEmpty()) return false
    let id = fluid.getFluid().builtInRegistryHolder().key().location().toString()
    let def = PE_FUELS[id]
    if (!def) return false
    if (tank.getFluidAmount() < 1000) return false
    let FluidAction = Java.loadClass('net.neoforged.neoforge.fluids.capability.IFluidHandler$FluidAction')
    tank.drain(1000, FluidAction.EXECUTE)
    let cur = 0
    try { cur = be.getCurrentBurnTime() } catch (e) { cur = 0 }
    be.setCurrentBurnTime(cur + def.ticks)
    be.setSuperHeated(def.sup)
    be.setChanged()
    try { be.notifyUpdate() } catch (e) { }
    return true
}

BlockEvents.rightClicked(event => {
    const { block, item, player, hand, level } = event
    if (level.isClientSide()) return
    if (!block.id.includes('portable_engine')) return
    if (item.isEmpty()) return

    const FluidHandlerCap = Java.loadClass('net.neoforged.neoforge.capabilities.Capabilities$FluidHandler')
    const FluidAction = Java.loadClass('net.neoforged.neoforge.fluids.capability.IFluidHandler$FluidAction')

    let itemHandler = null
    try { itemHandler = item.getCapability(FluidHandlerCap.ITEM) } catch (e) {
        console.warn(`[引擎灌燃料] ${item.id} 读取流体能力异常: ${e}`)
        itemHandler = null
    }
    if (!itemHandler) return

    // 遍历所有槽位找流体（不假设只有一个槽）
    // 注意：Rhino 对 try 块/循环里的 const 支持有 bug，这里统一用 let
    let heldFluid = null
    let readErr = null
    try {
        let slotCount = itemHandler.getTanks()
        for (let i = 0; i < slotCount; i++) {
            let f = itemHandler.getFluidInTank(i)
            if (f && !f.isEmpty()) { heldFluid = f; break }
        }
    } catch (e) {
        readErr = e
    }
    if (readErr) {
        console.warn(`[引擎灌燃料] ${item.id} 读取槽位异常: ${readErr}`)
        return
    }
    if (!heldFluid || heldFluid.isEmpty()) return

    const fluidId = heldFluid.getFluid().builtInRegistryHolder().key().location().toString()
    if (!PE_FUELS[fluidId]) return

    const engineBe = block.entity
    if (!engineBe) return
    let engineTank = null
    try { engineTank = engineBe.crb_getLavaTank() } catch (e) {
        console.warn(`[引擎灌燃料] 取引擎储罐失败: ${e}`)
        engineTank = null
    }
    if (!engineTank) return

    // 先模拟能灌多少
    const fluidAmount = heldFluid.getAmount()
    const simFill = engineTank.fill(heldFluid.copy(), FluidAction.SIMULATE)
    if (simFill <= 0) {
        player.tell(Text.yellow('燃料罐已经满了 / The fuel tank is already full'))
        event.cancel()
        return
    }
    if (simFill < fluidAmount) {
        player.tell(Text.yellow(`燃料罐空间不足，装不下这一桶（还差 ${fluidAmount - simFill} mB 空间） / Not enough tank space for this bucket (${fluidAmount - simFill} mB short)`))
        event.cancel()
        return
    }

    // 实际灌注
    engineTank.fill(heldFluid.copyWithAmount(simFill), FluidAction.EXECUTE)

    // 登记续烧监视（储罐坐标持久化，重启不丢）
    peWatchAdd(event.server, `${level.dimension}|${block.x}|${block.y}|${block.z}`)

    // 引擎没在烧就直接点火，让储罐里的燃料立刻生效
    let ignited = false
    try {
        if (engineBe.getCurrentBurnTime() <= 0) ignited = peIgnite(engineBe, engineTank)
    } catch (e) {
        console.warn(`[引擎灌燃料] 点火异常: ${e}`)
    }

    // 返还空容器：群峦桶的空桶就是不带流体组件的同名物品
    if (!player.isCreative()) {
        player.setItemInHand(hand, Item.of(item.id))
    }

    console.info(`[引擎灌燃料] ${player.name.string} 用 ${item.id} 给引擎加了 ${simFill} mB ${fluidId}${ignited ? '（已点火）' : ''}`)
    player.tell(Text.gold(ignited ? `已加入燃料：${simFill} mB，引擎点火！ / Fuel added: ${simFill} mB — engine ignited!` : `已加入燃料：${simFill} mB / Fuel added: ${simFill} mB`))
    event.cancel()
})

// 续烧守护：每 20 tick 巡一遍登记过的引擎，
// 燃烧时间快见底（<100 tick）且储罐还有燃料就自动续上。
// 只要储罐里有备用燃料，燃烧时间就不会归零，引擎一直烧。
let peWatchCounter = 0
ServerEvents.tick(event => {
    peWatchCounter++
    if (peWatchCounter < 20) return
    peWatchCounter = 0
    const server = event.server
    let arr = peWatchList(server)
    if (arr.length === 0) return
    let changed = false
    let keep = []
    for (let i = 0; i < arr.length; i++) {
        let parts = arr[i].split('|')
        if (parts.length !== 4) { changed = true; continue }
        let lvl = null
        try { lvl = server.getLevel(parts[0]) } catch (e) { lvl = null }
        if (!lvl) { changed = true; continue }
        let x = parseInt(parts[1])
        let y = parseInt(parts[2])
        let z = parseInt(parts[3])
        let be = null
        try { be = lvl.getBlock(x, y, z).entity } catch (e) { be = null }
        if (!be) { changed = true; continue } // 引擎被挖了，除名
        let tank = null
        try { tank = be.crb_getLavaTank() } catch (e) { tank = null }
        if (!tank) { changed = true; continue }
        let fluid = null
        try { fluid = tank.getFluid() } catch (e) { fluid = null }
        if (!fluid || fluid.isEmpty()) {
            changed = true // 储罐空了，除名（下次灌注会重新登记）
            continue
        }
        keep.push(arr[i])
        let burn = 0
        try { burn = be.getCurrentBurnTime() } catch (e) { burn = 0 }
        if (burn < 100) {
            let ok = false
            try { ok = peIgnite(be, tank) } catch (e) {
                console.warn(`[引擎灌燃料] 续烧异常 @${arr[i]}: ${e}`)
            }
            if (ok) console.info(`[引擎灌燃料] 引擎 @${arr[i]} 自动续烧`)
        }
    }
    if (changed) peWatchSave(server, keep)
})
