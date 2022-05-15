const db = require("../models/index.js");
const Filme = db.filmes;
const Comentario = db.comentarios;

// Criar e guardar um novo Filme
exports.create = async (req, res) => {
    // create a document (instance of model Filme)
    const filme = new Filme({
        nome: req.body.nome,
        imagem: req.body.imagem,
        trailer: req.body.trailer,
        tipo: req.body.tipo,
        categoria: req.body.categoria,
        ano: req.body.ano,
        realizador: req.body.realizador,
        produtora: req.body.produtora,
        elenco: req.body.elenco,
        sinopse: req.body.sinopse,
        classificacao: req.body.classificacao,
        avaliacao: 0,
        nAvaliacoes: 0,
        comentarios: []
    });

    try {
        await filme.save(); // save Filme in the database
        console.log(filme)
        res.status(201).json({ success: true, msg: "New Filme created.", URL: `/filmes/${filme._id}` });
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
                success: false, msg: err.message || "Some error occurred while creating the filme."
            });
    }

};

// Retrieve all Filmes / find by title
exports.findAll = async (req, res) => {
    const nome = req.query.nome;

    // build REGEX to filter filmes titles with a sub-string - i will do a case insensitive match 
    // (https://docs.mongodb.com/manual/reference/operator/query/regex/)
    let condition = nome ? { nome: new RegExp(nome, 'i') } : {};

    try {
        let data = await Filme
            .find(condition)
            .select('nome imagem tipo categoria elenco avaliacao')  // só vai buscar o nome, imagem, tipo, categoria, elenco e avaliação
            .exec();
        res.status(200).json({success: true, filme: data});
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Some error occurred while retrieving the filmes."
        });

    }
};

// Find a single Filme with an id
exports.findOne = async (req, res) => {
    try {
        // to use a full fledge promise you will need to use .exec(): findById or findOne returns a QUERY object, not a document
        // You can either use a callback as the solution suggests or as of v4+ findOne returns a thenable so you can use .then or await/async to retrieve the document
        //https://mongoosejs.com/docs/promises.html
        console.log(req.params.filmeID);
        const filme = await Filme.findById(req.params.filmeID)
            .exec();
        // no data returned means there is no filme in DB with that given ID 
        if (filme === null)
            return res.status(404).json({
                success: false, msg: `Cannot find any filme with ID ${req.params.filmeID}.`
            });
        // on success, send the filme data
        res.json({ success: true, filme: filme });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Error retrieving filme with ID ${req.params.filmeID}.`
        });
    }
};

// Delete a Filme with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const filme = await Filme.findByIdAndRemove(req.params.filmeID).exec();
        if (!filme)
            res.status(404).json({
                message: `Cannot delete Filme with id=${req.params.filmeID}. Maybe Filme was not found!`
            });
        else
            res.status(200).json({
                message: `Filme id=${req.params.filmeID} was deleted successfully.`
            });
    } catch (err) {
        res.status(500).json({
            message: `Error deleting Filme with id=${req.params.filmeID}.`
        });
    };
};

// exports.update = async (req, res) => {
//     try {
//         let filme = await Filme.findById(req.params.filmeID);
//         if (filme === null){
//             return res.status(404).json({
//                 success: false, msg: `Cannot find any filme with ID ${req.params.filmeID}`
//             })
//         }
//         console.log(filme);
//         let comentarios = await filme.find({ 
//             attributes: ['id', 'utilizador', 'comentario', 'spoiler']
//         });
        
//         // map default response to desired response data structure
//         res.status(200).json({
//             success: true,
//             comentarios: comentarios
//         });
//     }
//     catch (err) {
//         res.status(500).json({
//             success: false, msg: err.message || "Some error occurred while retrieving the filmes."
//         })
//     }
// }