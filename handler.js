module.exports = (client,config) =>{
    client.on('message',m=>{
        if(m.content[0]==config.prefix){
            m.cmd = m.content.replace(config.prefix,"").split(config.separator)
            let command_Role =  config.commands.find(c=> c.command_name == m.cmd[0])
            if(command_Role){
                m.member.roles.add(command_Role.role_id).then(mf=>{
                    m.channel.send("Votre role a été ajouté")
                }).catch(err=>{
                    m.channel.send("Impossible d'ajouté le role ("+err.message+")")
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