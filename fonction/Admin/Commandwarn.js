const bdd = require("../stockage/bdd.json")
const fs = require("fs");
const config = require('../../config.json') 


module.exports = (client) =>{ 
    
    client.on("message", message => {

    if(message.content.startsWith( config.PREFIX + "warn")){

    message.delete();

        if(message.member.hasPermission('BAN_MEMBERS')){

            if(!message.mentions.users.first()) 
                return;
            
                utilisateur = message.mentions.users.first().id

            if(bdd["warn"][utilisateur] == 5){
                
                delete bdd["warn"][utilisateur]

                message.guild.members.ban(utilisateur)

                message.channel.send("a etait bannis du discord.");

                Savebdd();

            }
            else{
                if(!bdd["warn"][utilisateur]){
                   
                    bdd["warn"][utilisateur] = 1
                    
                    Savebdd();
                    
                    message.channel.send("Tu as maintenant " + bdd["warn"][utilisateur] + " avertissements");
                    
                }
                else{
                    bdd["warn"][utilisateur]++
                   
                    Savebdd();

                    message.channel.send("Tu as maintenant " + bdd["warn"][utilisateur] + " avertissements");
                }
            }

    }

  
    }
});


function Savebdd() {
    fs.writeFile("./fonction/stockage/bdd.json", JSON.stringify(bdd, null, 4), (err) =>{
        if (err) message.channel.send("Une erreur est survenue lors de la sauvegarde.");
    });
   
}

Savebdd();




}