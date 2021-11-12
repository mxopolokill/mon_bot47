const fs = require("fs");

module.exports = (Savebdd) =>{ 


function Savebdd() {
    fs.writeFile("./fonction/stockage/bdd.json", JSON.stringify(bdd, null, 4), (err) =>{
        if (err) message.channel.send("Une erreur est survenue lors de la sauvegarde.");
    });
   
}

Savebdd();


}