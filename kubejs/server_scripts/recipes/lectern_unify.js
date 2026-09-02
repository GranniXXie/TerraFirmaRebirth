// 讲台统一：群峦/AFC/Beneath 的木质讲台全部退役，统一为原版讲台
// 动机：Create 无线红石遥控器放讲台的判定写死 Blocks.LECTERN，群峦讲台（虽继承原版讲台）
// 永远过不了判定，遥控器会被当"书"夹进去（右击弹秒退假 GUI）。
// TFC 讲台是纯装饰方块：不是任何配方的原料、无世界生成、任务书零引用，砍掉无连锁损失。
// 旧存档里已放置的木质讲台不受影响（方块还在，只是不再能合成），
// lectern_controller_guard.js 继续拦截它们与遥控器的无效交互。
ServerEvents.recipes(event => {
    // 1) 删除三个模组全部木质讲台配方（TFC 20 + AFC 14 + Beneath 2）
    event.remove({ output: /^(tfc|afc|beneath):wood\/lectern\/.*/ })

    // 2) 原版讲台新配方：成本对齐原 TFC 讲台（4 木料 + 1 书架）
    //    书架接受任意群峦/AFC/Beneath 书架（kubejs:any_bookshelf 标签）
    event.shaped('minecraft:lectern', [
        'LLL',
        ' B ',
        ' L '
    ], {
        L: '#tfc:lumber',
        B: '#kubejs:any_bookshelf'
    }).id('kubejs:crafting/lectern')
})
