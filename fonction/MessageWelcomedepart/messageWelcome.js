const bdd = require("../stockage/bdd.json")

module.exports = (client) =>{
    
    client.on("guildMemberAdd", member => {
        if(bdd["message-bienvenue"]) {
        
            member.guild.channels.cache.get("908419910567338015").send(bdd["message-bienvenue"] + `<@${member.user.id}>`);
        
        }
        else {
            member.guild.channels.cache.get('908419910567338015').send("bienvenue sur le serveur ! ")
        }

        member.roles.add('672316280761614356');
        //member.guild.channels.cache.get("908419910567338015").send(`Bienvenu le nouveau ! <@${member.user.id}> sur le serveur.`);
    
    
});

}
