const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");
const handler = require("./handler");
const ytdl = require("ytdl-core");

client.on("ready", () => {
  console.log("ok");
  handler(client, config);
  client.channels.cache.get("773275330521333821").send("redémarrage effectué");
  client.user.setActivity(" salut 🙂 ");
});

client.on("message", message => {
  if(message.content.channels(config.prefix + "cyber"))
    message.reply('https://itexam24.com/cybersecurity-essentials-1-1/cybersecurity-essentials-1-1-chapter-1-quiz-answers-100-2018/');
});

client.on("message", message => {
  if (message.content.startsWith(config.prefix + "song")) {
    if (message.member.voice.channel) {
      message.member.voice.channel
        .join()
        .then(connection => {
          let args = message.content.split(" ");
          message.reply("L'audio à démarré");

          let dispatcher = connection.play(
            ytdl(args[1], { quality: "highestaudio" })
          );

          dispatcher.on("finish", () => {
            dispatcher.destroy();
            connection.disconnect();
            message.reply("L'audio est terminé");
          });

          dispatcher.on("error", err => {
            console.log("erreur de dispatcher : " + err);
          });
        })
        .catch(err => {
          message.reply("erreur lors de la connexion : " + err);
        });
    } else {
      message.reply("vous n'êtes pas connecté en vocal.");
    }
  }
});

client.login(process.env.TOKEN);
