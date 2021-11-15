const discord = require('discord.js')

const moment = require('moment');

const config = require('../../config.json');

module.exports = (client) =>{ 
   
    client.on("message", message => { 
        
        if (message.content.startsWith(config.PREFIX + "info")) {
            if(message.mentions.users.first()) {
                user = message.mentions.users.first();
           } else{
                user = message.author;
            }
            const member = message.guild.member(user);
    
            const embed = new discord.MessageEmbed() 
            .setColor('#ff5555')
            .setThumbnail(user.avatarURL)
            .setTitle(`Information sur ${user.username}#${user.discriminator} :`)
            .addField('ID du compte:', `${user.id}`, true)
            .addField('Pseudo sur le serveur :', `${member.nickname ? member.nickname : 'Aucun'}`, true)
            .addField('A crée son compte le :', `${moment(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
            .addField('A rejoint le serveur le :', `${moment(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
            .addField('Status:', `${user.presence.status}`, true)
            .addField('Joue a :', `${member.user.presence.game || 'Not playing a game.'}`, true)
            .addField('Roles :', member.roles.cache.map(roles => `${roles.name}`).join(', '), true)
            .addField(`En réponse a :`,`${message.author.username}#${message.author.discriminator}`)
        message.channel.send(embed).then(message => message.delete({ timeout: 15000 }));
        }
    });

}