const dbConfig = require('../config/db.config.js');

const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.URL;

console.log(db.url);

(async () => {
    try {
        await db.mongoose.connect(db.url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log("Connected to the database!");
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
})();

db.filmes = require("./filmes.model.js")(mongoose);
db.jogos = require("./jogos.model.js")(mongoose);
db.utilizadores = require("./utilizadores.model.js")(mongoose);
db.categorias = require("./categorias.model.js")(mongoose);
db.desafios = require("./desafios.model.js")(mongoose);

module.exports = db;