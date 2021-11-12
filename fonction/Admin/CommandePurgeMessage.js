module.exports = (client) =>{ 
    
    client.on("message", message => {

    if(message.content.startsWith("!clear")){

    message.delete();

        if(message.member.hasPermission('MANAGE_MESSAGES')){

            let args = message.content.trim().split(/ +/g);

            if(args[1]){
              if(!isNaN(args[1]) && args[1] >= 1 && args[1] <=99 ){
                  
                  message.channel.bulkDelete(args[1]);
                  message.channel.send(`Vous avez supprimé ${args[1]} messages`);
              }
              else{
                  message.channel.send("vous devez indiquer une valeur entre 1 et 99 ! ( je peux pas gérer plus que 99 a cause de mes grand chef discord :/) ")
              }
            }
            else {
              message.channel.send("Vous devez indiquer un nombre de messages a supprimer !")
            }
            
        }
        else {
            message.channel.send('tu dois avec les perms pour gerer les messages !')
        }
    }

  

});

}