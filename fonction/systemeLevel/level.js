const bdd = require("../stockage/bdd.json")
const fs = require("fs");


module.exports = (client) =>{

    client.on("message", message => {
        if (message.content.startsWith === '!lvl') {
            if (bdd["statut-level"] == true) {
                bdd["statut-level"] = false
                Savebdd();
                return message.channel.send('Vous venez d\'arreter le système de level !');
            } else {
                bdd["statut-level"] = true;
                Savebdd();
                return message.channel.send('Vous venez d\'alumer le système de level !');
            }
        }

        if (bdd["statut-level"] == true) {
            if (message.content.startsWith === '!level') {
                if (!bdd["coins-utilisateurs"][message.member.id]) return message.channel.send(`Nous n'avez pas encore posté de message !`);
                return message.channel.send(`Vous avez ${bdd["coins-utilisateurs"][message.member.id]} points !\nEt vous êtes au level n°${bdd["level-utilisateurs"][message.member.id]}`)
            }
            if (!bdd["coins-utilisateurs"][message.member.id]) {
                bdd["coins-utilisateurs"][message.member.id] = Math.floor(Math.random() * (4 - 1) + 1);
                bdd["level-utilisateurs"][message.member.id] = 0;
                Savebdd();
            } else {
                let new_coins = bdd["coins-utilisateurs"][message.member.id] + Math.floor(Math.random() * (4 - 1) + 1);
                if (bdd["coins-utilisateurs"][message.member.id] < 100 && new_coins >= 100) {
                    bdd["level-utilisateurs"][message.member.id] = 1;
                    bdd["coins-utilisateurs"][message.member.id] = new_coins;
                    Savebdd();
                    return message.channel.send(`Bravo ${message.author} tu es passé niveau 1 !`);
                }
                if (bdd["coins-utilisateurs"][message.member.id] < 250 && new_coins >= 250) {
                    bdd["level-utilisateurs"][message.member.id] = 2;
                    bdd["coins-utilisateurs"][message.member.id] = new_coins;
                    Savebdd();
                    return message.channel.send(`Bravo ${message.author} tu es passé niveau 2 !`);
                }
                if (bdd["coins-utilisateurs"][message.member.id] < 500 && new_coins > 500) {
                    bdd["level-utilisateurs"][message.member.id] = 3;
                    bdd["coins-utilisateurs"][message.member.id] = new_coins;
                    Savebdd();
                    return message.channel.send(`Bravo ${message.author} tu es passé niveau 3 !`);
                }
                if (bdd["coins-utilisateurs"][message.member.id] < 1000 && new_coins > 1000) {
                    bdd["level-utilisateurs"][message.member.id] = 4;
                    bdd["coins-utilisateurs"][message.member.id] = new_coins;
                    Savebdd();
                    return message.channel.send(`Bravo ${message.author} tu es passé niveau 4 !`);
                }
            }
        }
        
});

function addRandomInt(member) {
    bdd["coins-utilisateurs"][member.id] = bdd["coins-utilisateurs"][member.id] + Math.floor(math.random() * (4-1) +1);
    Savebdd();
}

function Savebdd() {
    fs.writeFile("./fonction/stockage/bdd.json", JSON.stringify(bdd, null, 4), (err) =>{
        if (err) message.channel.send("Une erreur est survenue lors de la sauvegarde.");
    });
   
}

Savebdd();


}
