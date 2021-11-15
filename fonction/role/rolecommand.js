module.exports = (client,config) =>{ //récuperation élement Client et config du fichier index.js
    
      
    //Commande pour ajouter des roles via commandes 
    client.on('message',m=>{  //
       //fontion pour la création de la commande 
        if(m.content[0]==config.PREFIX){ // récupération du préfix et élément config 
            m.cmd = m.content.replace(config.PREFIX,"").split(config.separator)// Prefix +  command_name
            let command_Role =  config.commands.find(c=> c.command_name == m.cmd[0])
            //fonction commande role 
            if(command_Role){
                m.member.roles.add(command_Role.role_id).then(mf=>{// ajout roles a un membre spécifique récuperant le command_Role et Role ID pour savoir quelle donner a l'utilisateur
                    message.delete();
                    m.channel.send("Votre role a été ajouté")//le BOT répondra cela 
                    
                    //récuperation de l'erreur en cache 
                }).catch(err=>{
                    m.channel.send("Impossible d'ajouté le role ("+err.message+")") //le BOT répondra cela 
                })
            }else{
                /*Autre commande perso
                if(m.cmd[0] == "!NOM DE LA COMMANDE"){
    
                }else if(m.cmd[0] == "!NOM DE LA COMMANDE"){
    
                }else{
                    //commande inconnue
                }*/
            }
        }
    })
}