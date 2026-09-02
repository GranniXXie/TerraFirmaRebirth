ServerEvents.recipes(event => {
    // ============ 末影之眼清除：本包无末地、无末影人 ============
    // 末影珍珠保留（猪灵以物易物正常产出）；只处理末影之眼（无来源）

    // 直接删除：末影之眼合成、末影水晶（末地内容）、AE2/末地矿兼容残渣
    ;[
        'minecraft:ender_eye',
        'minecraft:end_crystal',
        'create:milling/compat/ae2/ender_pearl',
        'create:crushing/compat/elementaryores/ore_ender_end'
    ].forEach(id => event.remove({ id: id }))

    const swap = (id, from, to) => event.replaceInput({ id: id }, from, to)

    // 追踪子弹：末影之眼 → 恶魂之泪
    swap('immersiveengineering:blueprint/bullet_homing', 'minecraft:ender_eye', 'minecraft:ghast_tear')
    // 远程控制（drivebywire）：主控 → 恶魂之泪，导线 → 烈焰棒
    swap('drivebywire:linked_controller_hub', 'minecraft:ender_eye', 'minecraft:ghast_tear')
    swap('drivebywire:tweaked_controller_hub', 'minecraft:ender_eye', 'minecraft:ghast_tear')
    swap('drivebywire:wire', 'minecraft:ender_eye', 'minecraft:blaze_rod')
    // 摄影/投影（sable）：末影之眼 → 恶魂之泪
    swap('sable_schematic_api:camera', 'minecraft:ender_eye', 'minecraft:ghast_tear')
    swap('sable_schematic_api:projector', 'minecraft:ender_eye', 'minecraft:ghast_tear')
    swap('sable_schematic_api:projector_screen_locator', 'minecraft:ender_eye', 'minecraft:ghast_tear')
    // 原版末影箱：末影之眼 → 恶魂之泪
    swap('minecraft:ender_chest', 'minecraft:ender_eye', 'minecraft:ghast_tear')
})
