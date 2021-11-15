const { MessageEmbed } = require('discord.js');
const config = require('../../config.json') 


module.exports = (client ) =>{ 

    client.on("message", message => {

    if(message.content.startsWith( config.PREFIX + "stats")){
    message.delete();
        let onlines = message.guild.members.cache.filter(
            ({ presence }) => presence.status !== 'offline').size;

        let totalmembers = message.guild.members.cache.size;

        let totalservers = client.guilds.cache.size;

       

       
         //console.log(onlines,  totalmembers, totalservers, totalbots, totalrole   )

        const embedstats = new MessageEmbed()
	.setColor('#f00020')
	.setTitle('Statistique')
	.setURL('https://discord.gg/m75mEznX')
	.setAuthor('MxoPoLoKiLL', 'https://i.imgur.com/nZQiwHN.jpg', 'https://discord.gg/m75mEznX')
	.setDescription('Les statistiques ')
	.setThumbnail('https://i.imgur.com/nZQiwHN.jpg')
	.addFields(
		{ name: 'Membres connectés : ', value: onlines , inline: true },
		{ name: 'Membres total sur le serveur : ', value: totalmembers , inline: true },
        { name: 'Nombre de serveurs auquel le bot appartient :', value: totalservers, inline: true },
		
	)
	
	.setImage('https://i.nimgur.com/nZQiwHN.jpg')
	.setTimestamp()
	.setFooter('', 'https://i.imgur.com/nZQiwHN.jpg');

    message.channel.send(embedstats);
    }

    });

}