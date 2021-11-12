module.exports = (client) =>{
    
    client.on("guildMemberRemove", member => {
    
        member.guild.channels.cache.get("908419910567338015").send(`aurevoir  <@${member.user.id}>`);
    
});

}