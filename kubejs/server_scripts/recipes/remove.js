ServerEvents.recipes(event => {
    event.remove({type: 'smelting'})
    event.remove({type: 'blasting'})
    event.remove({type: 'minecraft:campfire_cooking'})
    event.remove({type: 'minecraft:smoking'})

    const ids = [
        "minecraft:observer", // 原版配方需原版圆石不可用，群峦版见 recipes/redstone.js
        "minecraft:comparator", // 同上，群峦版见 recipes/redstone.js
        'minecraft:minecart',
        // 活塞配方已恢复：改用 create 机械活塞同款配方，见 recipes/create/create.js
        "minecraft:cauldron",
        'minecraft:blast_furnace',
        'minecraft:paper',
        'minecraft:compass',
        'minecraft:granite',
        'minecraft:diorite',
        'minecraft:andesite',

        // 疣猪皮甲配方已恢复：疣猪皮通过 Cold Sweat 全局掉落修饰器由疣猪掉落（Beneath 下界有疣猪）
        // 下界抗热装备需求真实存在，删除会导致下界热浪期无甲可穿

        //ban捕鱼、运输(会刷物品)和物品搜集(还是区块加载？)船
        'littlelogistics:fishing_barge',
        'littlelogistics:barge',
        'littlelogistics:barrel_barge',
        'littlelogistics:vacuum_barge',

        'functionalstorage:collector_upgrade',
        /functionalstorage:oak_drawer_alternate_x/,

        'map_atlases:craft_atlas',
        'simpleradio:radio',
        'simpleradio:transceiver',
        'simpleradio:radiosmither',
        'simpleradio:transmitting_module',
        'simpleradio:speaker_module',
        'simpleradio:receiving_module',

        'textile:clothing/raw/socks',

        'tfcsbu:sophisticatedbackpacks/blasting_upgrade',

        "constructionwand:stone_wand",
        "constructionwand:iron_wand",
        "constructionwand:core_angel",
        "constructionwand:core_destruction",

        'immersive_aircraft:engine',

        //电弧炉直接出锻铁锭，绕开锻铁炉流程，数值也不对
        'tfc_ie_addon:arcfurnace/wrought_iron'
    ]
    ids.forEach(id => {
        event.remove({id: id})
    })

    //OEI统一材料后，封死原版铁制品工作台配方（这些物品走群峦渠道获得，不允许锻铁锭直接搓）
    const vanillaIronBan = [
        'minecraft:bucket',
        'minecraft:shears',
        'minecraft:chain',
        'minecraft:iron_bars',
        'minecraft:iron_door',
        'minecraft:iron_trapdoor',
        'minecraft:anvil',
        //宝石/煤块不允许9合1合成（TFC宝石是贵重品，不压缩存储）
        'minecraft:diamond_block',
        'minecraft:emerald_block',
        'minecraft:lapis_block',
        'minecraft:coal_block',
        'minecraft:amethyst_block',
        //金属块压缩/解压全封：OEI会把它们指向TFC装饰性金属块（4板材+锤=8块的装饰品，熔值仅100mB）
        //不封的话：4板材(8锭)→8装饰块→解压出72锭，刷锭漏洞
        'minecraft:iron_block',
        'minecraft:gold_block',
        'minecraft:copper_block',
        'minecraft:iron_ingot_from_iron_block',
        'minecraft:gold_ingot_from_gold_block',
        'minecraft:copper_ingot_from_copper_block'
    ]
    vanillaIronBan.forEach(id => {
        event.remove({id: id})
    })

    //OEI会把这些配方的产物替换成群峦物品，形成"便宜材料变贵重金属"的漏洞，一并封死：
    const oeiExploitBan = [
        'create:crafting/appliances/chain_from_zinc',      //锌粒锌锭 → 锻铁链条
        'create:crushing/iron_horse_armor',                //战利品马铠 → 锻铁锭
        'create:crushing/golden_horse_armor',              //金马铠 → 金锭
        'create:crushing/diamond_horse_armor',             //钻石马铠 → 钻石
        'immersiveengineering:crafting/nugget_copper_to_copper_ingot', //IE铜粒 → 铜锭
        'minecraft:iron_ingot_from_nuggets',               //铁粒 → 锻铁锭（反向 1锭拆9粒 保留，安山合金要用）
        'minecraft:gold_ingot_from_gold_nugget',            //金粒 → 金锭
        //Create黄铜/锌 压缩分解全封：分解输入是标签（c:storage_blocks），会把TFC装饰性金属块
        //（4板材+锤=8块、熔值仅100mB）分解成9个锭（900mB），刷锭漏洞；压缩路线同样无意义。
        //锌粒由 kubejs:crafting/zinc_nugget_from_tfc_zinc（1锌锭拆9粒）单独提供，不受影响。
        'create:crafting/materials/brass_block_from_compacting',
        'create:crafting/materials/brass_ingot_from_decompacting',
        'create:crafting/materials/brass_ingot_from_compacting',
        'create:crafting/materials/brass_nugget_from_decompacting',
        'create:crafting/materials/zinc_block_from_compacting',
        'create:crafting/materials/zinc_ingot_from_decompacting',
        'create:crafting/materials/zinc_ingot_from_compacting',
        'create:crafting/materials/zinc_nugget_from_decompacting'
    ]
    oeiExploitBan.forEach(id => {
        event.remove({id: id})
    })

    //保险：封死可能残留的原版金属工具/盔甲配方（正常情况下TFC已移除）
    //只限合成台配方：output 过滤会匹配序列组装的概率副产物（如引擎总成副产铁头盔），不能全局按输出删
    event.remove({output: /minecraft:(iron|golden|diamond)_(sword|shovel|pickaxe|axe|hoe|helmet|chestplate|leggings|boots)/, type: 'minecraft:crafting_shaped'})

    event.remove({mod: 'cookingforblockheads'})
})
