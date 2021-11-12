
module.exports = (client) =>{ 

    client.on("message", message => {

        if(message.content.startsWith("!ban")){

            message.delete();
        
        if(message.member.hasPermission('BAN_MEMBERS')){

            //!ban @ temps raison

          let arg = message.content.trim().split(/ +/g)

          utilisateur = message.mentions.members.first();
          temps = arg[2];
          raison = arg[3];

          if(!utilisateur){
              return message.channel.send('Vous devez mentionner un utilisateur !');
            
          }
          else{
              if(!temps || isNaN(temps)){
                  return message.channel.send("vous devez indiquer un temps en seconde !");
              }
              else{
                  if(!raison){
                      return message.channel.send("vous devez indiquez une raison du ban !");
                      
                  }
                  else{
                      //bannissement temporaire
                      message.guild.members.ban(utilisateur.id);
                      setTimeout(function(){
                          message.guild.members.unban(utilisateur.id)

                      }, temps*1000);
                  }

              }
          
            }

            
            
        }
        else{
            return message.channel.send('tu n\'as pas les droit de ban mec rêves pas')
        }
        }

    })
}
