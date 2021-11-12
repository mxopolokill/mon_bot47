
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
const message_bienvenue = require("./fonction/Admin/CommendeMessageBienvenueall")
const warn = require("./fonction/Admin/Commandwarn")
const stats = require("./fonction/statistique/statistique")
const statsyoutube = require("./fonction/donnéeYoutube/APIgoogle")
const ban = require ("./fonction/Admin/Commandeban")
const level = require("./fonction/systemeLevel/level")
const guild = require("./fonction/stockage/guildcreate") 
const bdd = require("./fonction/stockage/bdd.json")
const userinfo = require("./fonction/userinfo/userinfo")

const queue = new Map();


client.on("ready", async ()  => { 

    console.log("ok");
   
    handler(client, config);
    
    MusicYT(client);

    Bienvenu(client);

    depart(client);

    DeleteMessage(client);

    message_bienvenue(client, message_bienvenue);

    warn(client);

    stats(client);

    statsyoutube(client);
    
    ban(client);

    guild(client);

    userinfo(client);

    let statuts = bdd.stats
    setInterval(function() {
        let stats = statuts[Math.floor(Math.random()*statuts.length)];
        client.user.setActivity(stats, {type: "STREAMING"})
    }, 10000)
   client.user.setStatus("dnd");

       
  });
    

 


 







client.login(config.token)  