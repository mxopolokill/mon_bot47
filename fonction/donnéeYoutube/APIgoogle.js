const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json') 
module.exports = (client) =>{ 

    client.on("message",  async message => { 

        if(message.content.startsWith(config.PREFIX + "youtube")){
         message.delete();   
            const data = await fetch('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCZTiApraopd_HGwua9F0aug&key=AIzaSyCYoWHpd7oyCsk_-ChETT1UwvYDD4yK_1A').then(response => response.json());
            
            const embedyoutube = new MessageEmbed()
            .setColor('#f00020')
            .setTitle('Youtube')
            .setURL('https://www.youtube.com/c/MxoPoLoKill/')
            .setAuthor('MxoPoLoKiLL', 'https://i.imgur.com/nZQiwHN.jpg', 'https://discord.gg/m75mEznX')
            .setDescription('Les statistiques ')
            .setThumbnail('https://i.imgur.com/nZQiwHN.jpg')
            .addFields(
                { name: 'nombre d\'abonnés', value: data.items[0].statistics.subscriberCount  , inline: true },
                { name: 'nombre de vidéo', value: data.items[0].statistics.videoCount  , inline: true },
                { name: 'nombre de vues', value: data.items[0].statistics.viewCount  , inline: true },
            
                
            )
            
            .setImage('https://i.nimgur.com/nZQiwHN.jpg')
            .setTimestamp()
            .setFooter('PoloBOT', 'https://i.imgur.com/nZQiwHN.jpg');
        
            message.channel.send(embedyoutube);
            
        }

    })
}