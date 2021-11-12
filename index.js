
const discord = require('discord.js')
const client = new discord.Client() 
const config = require('./config.json')  
const handler = require("./fonction/role/rolecommand") 
const MusicYT = require("./fonction/musique/musiqueYoutube")
const Bienvenu = require("./fonction/MessageWelcomedepart/messageWelcome")
const depart = require("./fonction/MessageWelcomedepart/messageDepart")


client.on("ready", () => { 
    console.log("ok");
   
    handler(client, config);
    
    MusicYT(client);

    Bienvenu(client);

    depart(client);
   
    client.user.setPresence({
        activity: {
            name: 'In Dev'
        },
        status: 'dnd' 
    })     
  });







client.login(config.token)  