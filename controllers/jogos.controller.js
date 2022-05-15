const db = require("../models/index.js");
const Jogo = db.jogos;

// Criar e guardar um novo Jogo
exports.create = async (req, res) => {
    // create a document (instance of model Jogo)
    const jogo = new Jogo({
        nome: req.body.nome,
        img: req.body.img,
        tipo: req.body.tipo,
        classificacao: [''],
        perguntas: req.body.perguntas,
    });

    try {
        await jogo.save(); // save jogos in the database
        console.log(jogo);
        res.status(201).json({ success: true, msg: "New Jogo created.", URL: `/jogos/${jogo._id}` });
    }
    catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach((key) => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msgs: errors });
        }
        else
            res.status(500).json({
                success: false, msg: err.message || "Some error occurred while creating the jogo."
            });
    }

};

// Retrieve all Filmes / find by title
exports.findAll = async (req, res) => {
    const tipo = req.query.tipo;

    // build REGEX to filter tutorials titles with a sub-string - i will do a case insensitive match 
    // (https://docs.mongodb.com/manual/reference/operator/query/regex/)
    let condition = tipo ? { tipo: new RegExp(tipo, 'i') } : {};

    try {
        let data = await Jogo
            .find(condition)
            .select('nome img tipo')  // só vai buscar o nome, imagem, tipo
            .exec();
        res.status(200).json({success: true, jogo: data});
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Some error occurred while retrieving the jogos."
        });

    }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    try {
        // to use a full fledge promise you will need to use .exec(): findById or findOne returns a QUERY object, not a document
        // You can either use a callback as the solution suggests or as of v4+ findOne returns a thenable so you can use .then or await/async to retrieve the document
        //https://mongoosejs.com/docs/promises.html
        const jogo = await Jogo.findById(req.params.jogoID)
            .exec();
        // no data returned means there is no filme in DB with that given ID 
        if (jogo === null)
            return res.status(404).json({
                success: false, msg: `Cannot find any jogo with ID ${req.params.jogoID}.`
            });
        // on success, send the filme data
        res.json({ success: true, jogo: jogo });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Error retrieving filme with ID ${req.params.jogoID}.`
        });
    }
};

// Delete a Filme with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const jogo = await Jogo.findByIdAndRemove(req.params.jogoID).exec();
        if (!jogo)
            res.status(404).json({
                message: `Cannot delete Jogo with id=${req.params.jogoID}. Maybe Jogo was not found!`
            });
        else
            res.status(200).json({
                message: `Jogo id=${req.params.jogoID} was deleted successfully.`
            });
    } catch (err) {
        res.status(500).json({
            message: `Error deleting Jogo with id=${req.params.jogoID}.`
        });
    };
};

exports.findClassificacao = async (req, res) => {
    try {
        const jogo = await Jogo.findById(req.params.jogoID)
            .select('nome classificacao')  //pegar só no nome e na classificação do jogo
            .exec();
        // no data returned means there is no filme in DB with that given ID 
        if (jogo === null)
            return res.status(404).json({
                success: false, msg: `Cannot find any jogo with ID ${req.params.jogoID}.`
            });
        // on success, send the filme data
        res.json({ success: true, jogo: jogo });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Error retrieving filme with ID ${req.params.jogoID}.`
        });
    }
}