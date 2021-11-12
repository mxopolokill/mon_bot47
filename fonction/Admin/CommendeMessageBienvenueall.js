const bdd = require("../stockage/bdd.json")
const fs = require("fs");



module.exports = (client, message_bienvenue) =>{ 
    
   client.on("message", message => {

    if(message.content.startsWith("!mb")){
        message.delete();
            if(message.member.hasPermission('MANAGE_MESSAGES')){
                if(message.content.length > 5) {
                    message_bienvenue = message.content.slice(4)
                    bdd['message-bienvenue'] = message_bienvenue
                    console.log(message_bienvenue)
                    Savebdd();
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
