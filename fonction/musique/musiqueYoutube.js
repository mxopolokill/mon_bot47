const config = require('../../config.json') //importation du doc config.json 
const ytdl = require("ytdl-core"); //importation module ytdl-core

// fonction lecture musique Youtube
module.exports = (client) =>{
    
    client.on("message", message => { //création fonction message 
    if(message.content.startsWith(config.prefix + "song")){ //récuperation du contenu d'un message 
        if(message.member.voice.channel){ //Si le message et reconnu par le module ytdl-core 
            message.member.voice.channel.join().then(connection =>{ //Le BOT rejoindra le salon vocal ou et l'utilisateur 
                 //déclarage variation args
                let args = message.content.split(" "); //prépare le contenu du message précedent
                message.reply("L'audio a démarrer"); //le BOT répondra cela 
                //déclarage variation dispatcher 
                let dispatcher = connection.play(ytdl(args[1], {quality: "highestaudio"})); //ce connecte au serveur ytdl pour ainsi démarer et lire l'audio Youtube 
                //fonction de finition de la commande 
                dispatcher.on("finish", () =>{ // récuperation variable dispatcher  pour lui signifier que C'est fini 
                    dispatcher.destroy(); // suppresion du dispatcher 
                    connection.disconnect(); //déconnexion du BOT du vocal 
                    message.reply("L'audio est terminer");//le BOT répondra cela 
                });
                //fonction pour montrer les erreurs lié au dispatcher 
                dispatcher.on("error", err => {
                    console.log("erreur de dispatcher : " + err.catch); //le BOT répondra cela 
                });
                //récupération du message d'erreur en cache et explication de celui-ci dans le salon discord
            }).catch(err =>{
                message.reply("erreur lors de la connexion : " + err.catch); //le BOT répondra cela 
            });
        }
        //sinon il faut ce connecté a un vocal 
        else{
            message.reply("vous n'êtes pas connecté en vocal."); //le BOT répondra cela 
        }
    }
});

}