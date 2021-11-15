const config = require('../../config.json') //importation du doc config.json 
const ytdl = require("ytdl-core"); //importation module ytdl-core
const queue = new Map();

module.exports = (client) =>{

    client.on("message", async message => {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.PREFIX)) return;
      
        const serverQueue = queue.get(message.guild.id);
      
        if (message.content.startsWith(`${config.PREFIX}song`)) {
          execute(message, serverQueue).catch;
          return;
        } else if (message.content.startsWith(`${config.PREFIX}skip`)) {
          skip(message, serverQueue);
          return;
        } else if (message.content.startsWith(`${config.PREFIX}stop`)) {
          stop(message, serverQueue);
          return;
        } 
      });
      
      async function execute(message, serverQueue) {
        const args = message.content.split(" ");
      
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
          return message.channel.send(
            "Vous devez être dans un canal vocal pour jouer de la musique !"
          );
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
          return message.channel.send(
            "J'ai besoin des permissions pour rejoindre et parler dans votre canal vocal !"
          );
        }
      
        const songInfo = await ytdl.getInfo(args[1]);
        const song = {
              title: songInfo.videoDetails.title,
              url: songInfo.videoDetails.video_url,
         };
      
        if (!serverQueue) {
          const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
          };
      
          queue.set(message.guild.id, queueContruct);
      
          queueContruct.songs.push(song);
      
          try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
          } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
          }
        } else {
          serverQueue.songs.push(song);
          return message.channel.send(`${song.title} a été ajouté à la file d'attente !`);
        }
      }
      
      function skip(message, serverQueue) {
        if (!message.member.voice.channel)
          return message.channel.send(
            "Il faut être dans un canal vocal pour arrêter la musique !"
          );
        if (!serverQueue)
          return message.channel.send("Il n'y a aucune chanson que je pourrais sauter !");
        serverQueue.connection.dispatcher.end();
      }
      
      function stop(message, serverQueue) {
        if (!message.member.voice.channel)
          return message.channel.send(
            "Il faut être dans un canal vocal pour arrêter la musique !"
          );
          
        if (!serverQueue)
          return message.channel.send("Il n'y a aucune chanson que je pourrais arrêter !");
          
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
      }
      
      function play(guild, song) {
        const serverQueue = queue.get(guild.id);
        if (!song) {
          serverQueue.voiceChannel.leave();
          queue.delete(guild.id);
          return;
        }
      
        const dispatcher = serverQueue.connection
          .play(ytdl(song.url))
          .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
          })
          .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(`début lecture: **${song.title}**`);
      }


}