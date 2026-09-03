// ============ CC:Tweaked + CC:C Bridge 群峦适配 ============
// 设计原则：
// 1. 原版石头 → 群峦平滑岩标签（TFC世界没有 minecraft:stone）
// 2. 原版工作台 → 群峦木工台标签（TFC 禁用了 crafting_table）
// 3. 海龟钻石工具 → 红钢/蓝钢工具（A方案：海龟抬到红蓝钢时代，钻头和钻石工具在包内不可合成）
// 4. 末影之眼 → 恶魂之泪（包内无末地，遵循 ender_purge.js 的既定惯例；末影珍珠保留，猪灵以物易物可得）
// 5. 音符盒 → 木板（原版音符盒配方被TFC移除，音符盒=木板+红石的共振腔概念）
// 6. CCC:B：闪长岩切削块（asurine 不生成）→ 锻铁板；红石火把（被TFC移除）→ 无线红石链接器；皮革胸甲（被TFC移除）→ 皮革
ServerEvents.recipes(event => {
    const swap = (filter, from, to) => event.replaceInput(filter, from, to)

    // ---- CC:T 全局替换 ----
    // 石头 ×10 处（电脑/显示器/磁盘驱动器/打印机/音箱/线缆/红石中继）
    swap({ mod: 'computercraft' }, 'minecraft:stone', '#c:stones/smooth')
    // 工作台 ×2 处（海龟合成升级）
    swap({ mod: 'computercraft' }, 'minecraft:crafting_table', '#tfc:workbenches')
    // 音符盒（音箱）
    swap({ mod: 'computercraft' }, 'minecraft:note_block', '#minecraft:planks')
    // 末影之眼（高级无线调制解调器）
    swap({ mod: 'computercraft' }, 'minecraft:ender_eye', 'minecraft:ghast_tear')
    // 海龟底座：c:ingots/iron 已由 tags/item.js 补入群峦锻铁锭，无需此处替换。
    // c:ingots/gold 同理（TFC 自带 + tags/item.js 双保险），不再重复替换。

    // 金苹果（普通/高级掌上电脑的"魔法核心"）→ 群峦金薄板
    // TFC 删除了金苹果合成（仅战利品箱极少产出），导致掌上电脑全链路断裂：
    // 普通电脑做不了 → 高级升级路线断 → 装无线模组的成品自然合不出（玩家实锤）。
    // 金薄板=砧上锻打的镀金基板，成本与"高级电子产品核心"定位匹配。
    swap({ mod: 'computercraft' }, 'minecraft:golden_apple', 'tfc:metal/sheet/gold')

    // ---- 玻璃板：CC 全链路（电脑/显示器/便携电脑）的地基 ----
    // TFC 用 neoforge:false 彻底禁用了原版玻璃板配方，而 NeoForge 的 c:glass_panes
    // 标签只认原版玻璃板 → 包内没有任何可获得的玻璃板 → CC 一台电脑都造不出来。
    // 原版玻璃可由电弧炉（玻璃批次）量产，恢复原版比例：6 玻璃 → 16 玻璃板。
    event.shaped('16x minecraft:glass_pane', ['GGG', 'GGG'], { G: 'minecraft:glass' })
        .id('kubejs:crafting/glass_pane')

    // ---- 海龟工具升级：钻石 → 红钢（普通）/ 蓝钢（高级）----
    // CC 的升级装配由特殊配方（turtle_upgrade）+ 数据文件（computercraft/turtle_upgrade/*.json）
    // 驱动，EMI 里的组合配方只是展示（impostor 类型永远不可合成，CC 官方设计）。
    // 原数据文件只认拿不到的钻石工具 → 海龟永远装不上工具。
    // 现由 kubejs/data/kubejs/computercraft/turtle_upgrade/red|blue_steel_*.json 注册
    // 群峦红/蓝钢工具，显示配方由 data/computercraft/recipe/turtle_* 覆盖同步。
    // 巧匠海龟（工作台升级）：原版工作台被 TFC 禁用，无法注册为升级项，直接隐藏展示配方。
    ;[
        'computercraft:turtle_normal/minecraft/crafting_table',
        'computercraft:turtle_advanced/minecraft/crafting_table'
    ].forEach(id => event.remove({ id: id }))

    // ---- CC:C Bridge ----
    // 幻翼人偶：皮革胸甲 → 皮革（皮革甲被TFC禁用）
    swap({ id: 'cccbridge:animatronic_block' }, 'minecraft:leather_chestplate', 'minecraft:leather')
    // 红石路由：红石火把 → 无线红石链接器（红石火把被TFC禁用；链接器更贴合"无线路由"主题）
    swap({ id: 'cccbridge:redrouter_block' }, 'minecraft:redstone_torch', 'create:redstone_link')
    // 滚动屏/源方块：切制闪长岩 → 锻铁板（Create装饰岩在TFC世界不生成）
    swap({ id: 'cccbridge:scroller_block' }, 'create:cut_asurine', 'tfc:metal/sheet/wrought_iron')
    swap({ id: 'cccbridge:source_block' }, 'create:cut_asurine', 'tfc:metal/sheet/wrought_iron')
})
