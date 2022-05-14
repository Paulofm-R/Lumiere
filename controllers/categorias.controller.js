const db = require("../models/index.js");
const Categoria = db.categorias;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    // create a document (instance of model Categoria)
    const categoria = new Categoria({
        categoria: req.body.categoria
    });

    try {
        await categoria.save(); // save Categoria in the database
        console.log(categoria)
        res.status(201).json({ success: true, msg: "New Categoria created.", URL: `/categorias/${categoria._id}` });
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
                success: false, msg: err.message || "Some error occurred while creating the categoria."
            });
    }
};

// Retrieve all Categoria / find by title
exports.findAll = async (req, res) => {
    try {
        let data = await Categoria
            .find()
            .exec();
        console.log(data);
        res.status(200).json({ success: true, categoria: data });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Some error occurred while retrieving the categorias."
        });
    }
};