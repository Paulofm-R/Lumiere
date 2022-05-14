const db = require("../models/index.js");
const Desafio = db.desafios;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    // create a document (instance of model Desafio)
    const desafio = new Desafio({
        nome: req.body.nome,
        nEtapas: req.body.nEtapas,
        imagem: req.body.imagem
    });

    try {
        await desafio.save(); // save Desafio in the database
        console.log(desafio)
        res.status(201).json({ success: true, msg: "New Desafio created.", URL: `/desafios/${desafio._id}` });
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
                success: false, msg: err.message || "Some error occurred while creating the desafio."
            });
    }
};

// Retrieve all Desafio / find by title
exports.findAll = async (req, res) => {
    try {
        let data = await Desafio
            .find()
            .exec();
        console.log(data);
        res.status(200).json({ success: true, desafio: data });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Some error occurred while retrieving the desafios."
        });
    }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    try {
        // to use a full fledge promise you will need to use .exec(): findById or findOne returns a QUERY object, not a document
        // You can either use a callback as the solution suggests or as of v4+ findOne returns a thenable so you can use .then or await/async to retrieve the document
        //https://mongoosejs.com/docs/promises.html
        console.log(req.params.desafioID);
        const desafio = await Desafio.findById(req.params.desafioID)
            .exec();
        // no data returned means there is no filme in DB with that given ID 
        if (desafio === null)
            return res.status(404).json({
                success: false, msg: `Cannot find any desafio with ID ${req.params.desafioID}.`
            });
        // on success, send the filme data
        res.json({ success: true, desafio: desafio });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Error retrieving desafio with ID ${req.params.desafioID}.`
        });
    }
};