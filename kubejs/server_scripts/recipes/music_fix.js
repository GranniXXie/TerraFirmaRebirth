// Music Maker (xercamusic) 死配方清理
// 背景：TFCMusicMaker 兼容层（tfcmusic 命名空间）已为全部乐器提供群峦材料版配方。
// xercamusic 原版配方使用 vanilla 单体物品（橡木/云杉/深色橡木/金合欢木板、铁粒、金粒、金锭），
// 这些物品在包内均不可得——JEI/EMI 里会挂一排做不出来的配方，删除原版只留群峦版。
ServerEvents.recipes(event => {
    const deadOriginals = [
        'banjo', 'bass_guitar', 'cello', 'cymbal', 'flute', 'french_horn',
        'guitar', 'lyre', 'music_box', 'oboe', 'organ', 'piano',
        'redstone_guitar', 'redstone_piano', 'sansula', 'saxophone',
        'trumpet', 'tubular_bell', 'violin', 'xylophone'
    ]
    deadOriginals.forEach(n => event.remove({ id: `xercamusic:${n}` }))

    // 以下原版配方经核实可得，保留不动：
    // - music_sheet（纸+墨囊+羽毛，包内均可得）
    // - notecloning（乐谱临摹，纸类）
    // - drum / drum_kit（皮革+木板标签——TFC 已把 minecraft:planks 标签覆写为群峦木板）
    // - metronome（音符盒+钟：音符盒的木板标签同上；钟的金锭已被 OEI 统一成群峦金锭）
})
