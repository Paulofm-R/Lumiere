const db = require("../models/index.js");
const Desafio = db.desafios;

// Criar e guardar um nov Desafio
exports.create = async (req, res) => {
    // create a document (instance of model Desafio)
    const desafio = new Desafio({
        nome: req.body.nome,
        nEtapas: req.body.nEtapas,
        imagem: req.body.imagem
    });

    try {
        if (req.UtilizadorAutenticadoRole !== "admin") {
            return res.status(403).json({
                success: false, msg: "Esta solicitação só é possivel para ADMINISTRADORES!"
            });
        }
        
        await desafio.save(); // save Desafio in the database
        res.status(201).json({ success: true, msg: "Novo Desafio criado.", URL: `/desafios/${desafio._id}` });
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
                success: false, msg: err.message || "Ocorreu algum erro ao criar o desafio."
            });
    }
};

// Recuperar todos os Desafios
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
            success: false, msg: err.message || "Ocorreu algum erro ao recuperar os desafios."
        });
    }
};

// Encontre um único Desafios com um id
exports.findOne = async (req, res) => {
    try {
        const desafio = await Desafio.findById(req.params.desafioID)
            .exec();
        // no data returned means there is no desafio in DB with that given ID 
        if (desafio === null)
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum desafio com ID ${req.params.desafioID}.`
            });
        // on success, send the desafio data
        res.json({ success: true, desafio: desafio });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Erro ao recuperar desafio com ID ${req.params.desafioID}.`
        });
    }
};