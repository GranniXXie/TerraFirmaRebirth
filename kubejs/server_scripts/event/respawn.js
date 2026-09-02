PlayerEvents.respawned(event => {
    const {player, server} = event
    
    const playername = player.name.getString()
    server.runCommandSilent(`tfc player ${playername} set hunger 8`)
    server.runCommandSilent(`tfc player ${playername} set saturation 20`)
    server.runCommandSilent(`tfc player ${playername} set water 40`)
})