const db = require("../models/index.js");
const Categoria = db.categorias;

// Criar e guardar uma nova Categoria
exports.create = async (req, res) => {
    // create a document (instance of model Categoria)
    const categoria = new Categoria({
        categoria: req.body.categoria
    });

    try {
        if (req.UtilizadorAutenticadoRole !== "admin") {
            return res.status(403).json({
                success: false, msg: "Esta solicitação só é possivel para ADMINISTRADORES!"
            });
        }
        await categoria.save(); // save Categoria in the database
        res.status(201).json({ success: true, msg: "Nova categoria criada.", URL: `/categorias/${categoria._id}` });
    }
    catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach((key) => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msgs: errors });
        }
        else {
            res.status(500).json({
                success: false, msg: err.message || "Ocorreu algum erro ao criar a categoria."
            });
        }
    }
};

exports.findAll = async (req, res) => {
    try {
        let data = await Categoria
            .find()
            .exec();
        res.status(200).json({ success: true, categoria: data });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Ocorreu algum erro ao recuperar as categorias."
        });
    }
};