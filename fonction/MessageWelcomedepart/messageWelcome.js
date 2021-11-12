module.exports = (client) =>{
    
    client.on("guildMemberAdd", member => {
    member.guild.channels.cache.get("908419910567338015").send(`Bienvenu le nouveau ! <@${member.user.id}> sur le serveur.`);
});

}
