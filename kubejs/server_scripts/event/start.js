PlayerEvents.loggedIn(event => {
    const {player, server} = event

    // 玩家首次登录
    if(!player.persistentData.logged) {
        player.persistentData.logged = true

        player.tell(Text.aqua("----------------------------------------"))
        player.tell(Text.of("欢迎游玩《群峦：重生(TerraFirma: Rebirth)》！"))
        player.tell(Text.of("Welcome to TerraFirma: Rebirth!"))
        player.tell(Text.of("本整合包是以1.21.1的群峦传说为主题的轻量魔改整合包。"))
        player.tell(Text.of("A lightly-modded modpack built around TerraFirmaCraft on 1.21.1."))
        player.tell(Text.of("当前为4.1.21 Release正式版本，已趋于稳定，推荐长期生存游玩，如遇bug烦请联系制作组。"))
        player.tell(Text.of("This is the 4.1.21 Release — stable and ready for long-term survival. Please report any bugs to the dev team."))
        player.tell(Text.aqua("----------------------------------------"))
        // 鸣谢名单
        player.tell(Text.gold("——————— 鸣谢 Credits ———————"))
        player.tell(Text.of("代码开发支持 Code: 心知 XinZhi (Bilibili), Coin0804 (CurseForge)"))
        player.tell(Text.of("宝贵修改意见 Feedback: zombie_boy"))
        player.tell(Text.of("测试者名单 Testers: shiro, 墨乘风-, Lincoln, EchoesTFM, mingyue2024"))
        player.tell(Text.of("ChiDeXing, 一只小白给a, MPC托马斯_official, 蒋鸽咕咕咕, me107107"))
        player.tell(Text.of("特别鸣谢 Special Thanks: 猪人喜欢朋友"))
        player.tell(Text.gold("———————————————————"))

        // 开局给予20分钟恩典
        player.potionEffects.add('cold_sweat:grace', 20*60*20)

        // 新手礼包（原 starterkit 模组发放的内容，模组已删，改由脚本发放）
        player.give('ftbquests:book')
        player.give('patchouli:guide_book[patchouli:book="tfc:field_guide"]')
        player.give('immersiveengineering:manual')
        player.give('cold_sweat:thermometer')
        server.runCommandSilent(`item replace entity ${player.username} armor.chest with sophisticatedbackpacks:backpack[sophisticatedcore:number_of_inventory_slots=27,sophisticatedcore:number_of_upgrade_slots=1]`)
        server.runCommandSilent(`item replace entity ${player.username} armor.legs with tfc_coldsweat:wool_leggings[cold_sweat:armor_insulation={insulation:[]}]`)
    }
})

ServerEvents.loaded(event => {
    event.server.runCommandSilent('gamerule reducedDebugInfo false')
})
