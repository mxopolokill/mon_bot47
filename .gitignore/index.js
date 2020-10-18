const discord = require('discord.js')
const client = new discord.Client()
const config = require('./config.json')
const handler = require("./handler")


client.on('ready',()=>{
    console.log('ok')
    handler(client,config)
    client.user.setActivity(" salut 🙂")
    
})





client.login(process.env.TOKEN)
