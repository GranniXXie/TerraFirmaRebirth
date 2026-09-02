// WoodenCog 去糟粕 + Copycats 死配方修复
// 背景：woodencog 是 TFC×Create 兼容模组，大部分配方是精华（木制动力源、机械压床锻打工序自动化、大桶配方搅拌自动化等）
// 但有少数配方会短路我们的流程门控或与我们已有配方完全重复，在此清除。
ServerEvents.recipes(event => {

    // === 糟粕清除 ===

    // 1. 石器时代短路：5块散安山岩直接敲出安山合金，绕开"安山合金=真合金（熔岩+铸铁）"的冶金门控
    //    注意：woodencog 配置里的 default_on 只是敲击界面的预填开关，并不会禁用配方，必须用 remove
    event.remove({ id: 'woodencog:rock_knapping/andesite_alloy' })

    // 2. 部署器自动化短路：安山岩+凿子直接出安山合金（100%+25%概率），比熔炼还便宜；
    //    且与 stone_processing.js 的 散石+凿子→砖 配方同输入冲突
    event.remove({ id: 'woodencog:rock_knapping/andesite_alloy_deploying' })

    // 3. 圆石→沙砾 粉碎配方：与 stone_processing.js 的全 21 岩种配方完全重复（同输入同输出），保留我们的版本
    event.remove({ id: /^woodencog:crushing\/rock\/cobble\/.*/ })

    // 4. 搅拌配方撞车清除：以下 woodencog 配方与我们 create.js 里的自研搅拌配方同输入（或互为子集），
    //    搅拌盆匹配会出现二义性、JEI/EMI 里也会显示两套重复配方。全部保留我们的版本（更省时、数值是我们调过的）：
    //    - lye（碱液）：我方 1木灰+500水→500碱液 瞬时；对方 5木灰+1000水→1000 需加热，又贵又慢
    //    - limewater_from_lime：与我方 create:mixing/limewater 逐字相同（1石灰粉+500水→500石灰水）
    //    - barrel/glue（胶水）：同输入 骨粉+石灰水，我方 500mB 瞬时、对方 600mB 还要搅 12 分钟
    //    - barrel/mortar（砂浆）：同比例 1沙+100石灰水→16砂浆，对方是慢速版（12分钟），我方为瞬时批量版
    //    - barrel/jute_fiber（黄麻纤维）：同输入 黄麻+200水，我方瞬时
    //    - barrel/clean_jute_net（洗净黄麻网）：同输入 脏网+水，互为子集会抢匹配
    event.remove({ id: 'woodencog:mixing/lye' })
    event.remove({ id: 'woodencog:mixing/limewater_from_lime' })
    event.remove({ id: 'woodencog:mixing/barrel/glue' })
    event.remove({ id: 'woodencog:mixing/barrel/mortar' })
    event.remove({ id: 'woodencog:mixing/barrel/jute_fiber' })
    event.remove({ id: 'woodencog:mixing/barrel/clean_jute_net' })

    // 5. 机械锯切全系清除（575 条），分两部分：
    //    a) 敲击/缝纫自动化（50 条）：散石(#tfc:rock_knapping)直接锯出石斧/锤/锄/标枪/刀/铲头，
    //       皮革(#tfc:leather_knapping)直接锯出皮甲/鞍/马铠——跳过敲击缝纫这群峦核心手艺，与整合包理念冲突；
    //    b) 台阶/楼梯/磨石锯切（525 条）：slab 与 stair 两组 217 条配方输入完全相同（如岩砖→台阶、岩砖→楼梯），
    //       Create 机械锯没有配方选择界面，同一输入只会永远命中第一条，另一半配方事实上是死的，
    //       JEI/EMI 里挂一堆做不出来的配方恰恰是我们一直在清理的问题。
    //    台阶楼梯走 TFC 原生工作台配方（不受影响）；日后若想要锯切自动化，需按"输入错峰"重做（如 块→台阶→半台阶）。
    //    另注：jar 内还有个 0 字节的 cutting/s.json 空配方文件，会在日志产生一条无害的数据包解析警告，改不到 jar 内部，忽略即可。
    event.remove({ id: /^woodencog:cutting\/.*/ })

    // === Copycats 兼容修复 ===

    // copycats 三条配方直接使用 create:zinc_ingot，但包内 create 锌锭链已封（压缩/解压配方已删，create 锌锭不可得）
    // 换成 c 标签锌锭（包内指向 tfc:metal/ingot/zinc，群峦渠道可得）
    const copycatsZincFix = [
        'copycats:copycat_cogwheel',
        'copycats:copycat_fluid_pipe',
        'copycats:copycat_large_cogwheel'
    ]
    copycatsZincFix.forEach(id => {
        event.replaceInput({ id: id }, 'create:zinc_ingot', '#c:ingots/zinc')
    })

    // 6. 动力桥接全系封禁（2026-08-29 平衡裁定）：
    //    - wooden_generator（木制动力源）：群峦风车/水车直接转 Create 应力（水车1024SU、风车4096SU），
    //      属于无中生有白嫖应力，包内 Create 应力必须走正规水车/锅炉线，禁用
    //    - ct_transformer（传动转换器）：Create→群峦方向与 c2tfc 应力转换器（任务书"应力-->群峦旋转力"）功能重复，
    //      同方向只保留 c2tfc 一家，避免两套成本并存玩家二选一另一个吃灰
    event.remove({ id: 'woodencog:crafting/kinetics/wooden_generator' })
    event.remove({ id: 'woodencog:crafting/kinetics/ct_transformer' })

    // copycat_iron_door 用的 minecraft:iron_door 看似被 ban，实际 TFC 砧上 锻铁薄板→铁门 的配方仍在，可得，不动
})
