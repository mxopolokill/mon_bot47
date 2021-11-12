module.exports = (client) =>{
    
    client.on("guildMemberAdd", member => {
       
    member.guild.channels.cache.get("908419910567338015").send(`Bienvenu le nouveau ! <@${member.user.id}> sur le serveur.`);
    
    member.roles.add('672316280761614356');

    
});

}