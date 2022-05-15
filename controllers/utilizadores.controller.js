const db = require("../models/index.js");
const Utilizador = db.utilizadores;

// Criar e guardar um novo Utilizador
exports.create = async (req, res) => {
    // create a document (instance of model Utilizador)
    const utilizador = new Utilizador({
        nome: req.body.nome,
        palavra_passe: req.body.palavra_passe,
        data_nascimento: req.body.data_nascimento,
        foto: "./image/User.svg",
        tipo: "utilizador",
        favoritos: [],
        lista: [],
        numJogos: 0,
        desafios: [],
    });

    try {
        await utilizador.save(); // save Utilizador in the database
        console.log(utilizador)
        res.status(201).json({ success: true, msg: "New Utilizador created.", URL: `/utilizadores/${utilizador._id}` });
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
                success: false, msg: err.message || "Some error occurred while creating the utilizador."
            });
    }

};

// Retrieve all utilizador / find by nome
exports.findAll = async (req, res) => {
    const nome = req.query.nome;

    // build REGEX to filter utilizadores titles with a sub-string - i will do a case insensitive match 
    // (https://docs.mongodb.com/manual/reference/operator/query/regex/)
    let condition = nome ? { nome: new RegExp(nome, 'i') } : {};

    try {
        let data = await Utilizador
            .find(condition)
            .select('nome foto tipo')  // só vai buscar o nome, foto, tipo
            .exec();
        res.status(200).json({success: true, utilizador: data});
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Some error occurred while retrieving the utilizadores."
        });

    }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    try {
        // to use a full fledge promise you will need to use .exec(): findById or findOne returns a QUERY object, not a document
        // You can either use a callback as the solution suggests or as of v4+ findOne returns a thenable so you can use .then or await/async to retrieve the document
        //https://mongoosejs.com/docs/promises.html
        console.log(req.params.utilizadorID);
        const utilizador = await Utilizador.findById(req.params.utilizadorID)
            .exec();
        // no data returned means there is no filme in DB with that given ID 
        if (utilizador === null)
            return res.status(404).json({
                success: false, msg: `Cannot find any utilizador with ID ${req.params.utilizadorID}.`
            });
        // on success, send the filme data
        res.json({ success: true, utilizador: utilizador });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Error retrieving filme with ID ${req.params.utilizadorID}.`
        });
    }
};

// Delete a Utilizador with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const utilizador = await Utilizador.findByIdAndRemove(req.params.utilizadorID).exec();
        if (!utilizador)
            res.status(404).json({
                message: `Cannot delete Utilizador with id=${req.params.utilizadorID}. Maybe Utilizador was not found!`
            });
        else
            res.status(200).json({
                message: `Utilizador id=${req.params.utilizadorID} was deleted successfully.`
            });
    } catch (err) {
        res.status(500).json({
            message: `Error deleting Utilizador with id=${req.params.utilizadorID}.`
        });
    };
};

exports.update = async (req, res) => {
    // validate request body data
    if (!req.body) {
        res.status(400).json({ message: "Request body can not be empty!" });
        return;
    }
    try {
        // Issues a mongodb findAndModify update command by a document's _id field
        // Finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback
        const utilizador = await Utilizador.findByIdAndUpdate(req.params.utilizadorID, req.body,
            {
                returnOriginal: false, // to return the updated document
                runValidators: true, //runs update validators on this command. Update validators validate the update operation against the model's schema ( example: does not allow for null titles)
                useFindAndModify: false //https://mongoosejs.com/docs/deprecations.html#findandmodify,
            }
        ).exec();
        console.log(utilizador)

        if (!utilizador)
            return res.status(404).json({
                message: `Cannot update Utilizador with id=${req.params.utilizadorID}. Maybe Utilizador was not found!`
            });
        res.status(200).json({
            message: `Utilizador id=${req.params.utilizadorID} was updated successfully.`
        });
    } catch (err) {
        res.status(500).json({
            message: `Error updating Utilizador with id=${req.params.utilizadorID}.`
        });
    };
}