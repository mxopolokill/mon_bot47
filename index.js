
const discord = require('discord.js')
const client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_PRESENCES
    ]
});


const config = require('./config.json')  
const handler = require("./fonction/role/rolecommand") 
const MusicYT = require("./fonction/musique/musiqueYoutube")
const Bienvenu = require("./fonction/MessageWelcomedepart/messageWelcome")
const depart = require("./fonction/MessageWelcomedepart/messageDepart")
const DeleteMessage = require("./fonction/Admin/CommandePurgeMessage")
const bdd = require("./fonction/stockage/bdd.json")
const message_bienvenue = require("./fonction/Admin/CommendeMessageBienvenueall")
const warn = require("./fonction/Admin/Commandwarn")

const messageDepart = require('./fonction/MessageWelcomedepart/messageDepart')

client.on("ready", () => { 
    console.log("ok");
   
    handler(client, config);
    
    MusicYT(client);

    Bienvenu(client);

    depart(client);

    DeleteMessage(client);

    message_bienvenue(client, message_bienvenue);

    warn(client);

    client.user.setPresence({
        activity: {
            name: 'In Dev'
        },
        status: 'dnd' 
    })     
  });
    

 


 







client.login(config.token)  