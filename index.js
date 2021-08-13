const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");
const handler = require("./handler");
const ytdl = require("ytdl-core");

client.on("ready", () => {
  console.log("ok");
  handler(client, config);
  client.user.setActivity(" salut 🙂 ");
  client.user.setPresence({
    activity: {
      name: "In Dev",
    },
    status: "dnd",
  });
});

client.on("message", (message) => {
  if (message.content.startsWith(config.prefix + "song")) {
    if (message.member.voice.channel) {
      message.member.voice.channel
        .join()
        .then((connection) => {
          let args = message.content.split(" ");
          message.reply("L'audio a démarrer");

          let dispatcher = connection.play(
            ytdl(args[1], { quality: "highestaudio" })
          );

          dispatcher.on("finish", () => {
            dispatcher.destroy();
            connection.disconnect();
            message.reply("L'audio est terminer");
          });

          dispatcher.on("error", (err) => {
            console.log("erreur de dispatcher : " + err.catch);
          });
        })
        .catch((err) => {
          message.reply("erreur lors de la connexion : " + err.catch);
        });
    } else {
      message.reply("vous n'êtes pas connecté en vocal.");
    }
  }
});

client.login(config.token);
