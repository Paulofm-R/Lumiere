const db = require("../models/index.js");
const Utilizador = db.utilizadores;
const Filme = db.filmes;

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
        res.status(201).json({ success: true, msg: "Novo Utilizador criado.", URL: `/utilizadores/${utilizador._id}` });
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
                success: false, msg: err.message || "Ocorreu algum erro ao criar o usuário."
            });
    }

};

// Retrieve all utilizador / find by nome
exports.findAll = async (req, res) => {
    const nome = req.query.nome;

    // build REGEX to filter utilizadores titles with a sub-string - i will do a case insensitive match 
    let condition = nome ? { nome: new RegExp(nome, 'i') } : {};

    try {
        let data = await Utilizador
            .find(condition)
            .select('nome foto tipo')  // só vai buscar o nome, foto, tipo
            .exec();
        res.status(200).json({ success: true, utilizador: data });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Ocorreu algum erro ao recuperar os usuários."
        });

    }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    try {
        // to use a full fledge promise you will need to use .exec(): findById or findOne returns a QUERY object, not a document
        // You can either use a callback as the solution suggests or as of v4+ findOne returns a thenable so you can use .then or await/async to retrieve the document
        console.log(req.params.utilizadorID);
        const utilizador = await Utilizador.findById(req.params.utilizadorID)
            .exec();
        // no data returned means there is no utilizador in DB with that given ID 
        if (utilizador === null)
            return res.status(404).json({
                success: false, msg: `Não foi possível encontrar nenhum utilizador com ID ${req.params.utilizadorID}.`
            });
        // on success, send the utilizador data
        res.json({ success: true, utilizador: utilizador });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Erro ao recuperar o utilizador com ID ${req.params.utilizadorID}.`
        });
    }
};

// Delete a Utilizador with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const utilizador = await Utilizador.findByIdAndRemove(req.params.utilizadorID).exec();
        if (!utilizador)
            res.status(404).json({
                message: `Não é possível excluir o usuário com id=${req.params.utilizadorID}. Talvez o usuário não foi encontrado!`
            });
        else
            res.status(200).json({
                message: `Utilizador id=${req.params.utilizadorID} foi excluído com sucesso.`
            });
    } catch (err) {
        res.status(500).json({
            message: `Erro ao excluir usuário com id=${req.params.utilizadorID}.`
        });
    };
};

exports.update = async (req, res) => {
    // validate request body data
    if (!req.body) {
        res.status(400).json({ message: "O corpo da solicitação não pode estar vazio!" });
        return;
    }
    try {
        const utilizador = await Utilizador.findByIdAndUpdate(req.params.utilizadorID, req.body,
            {
                returnOriginal: false,
                runValidators: true,
                useFindAndModify: false
            }
        ).exec();

        if (!utilizador)
            return res.status(404).json({
                message: `Não é possível atualizar o usuário com id=${req.params.utilizadorID}. Talvez o usuário não foi encontrado!`
            });
        res.status(200).json({
            message: `Utilizador id=${req.params.utilizadorID} foi atualizado com sucesso.`
        });
    } catch (err) {
        res.status(500).json({
            message: `Erro ao atualizar o usuário com id=${req.params.utilizadorID}.`
        });
    };
}

// filmes
exports.addFavoritos = async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.filmeID)
            .select('_id')
            .exec();

        if (filme === null) {
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum filme com ID ${req.params.filmeID}.`
            });
        }

        const utilizador = await Utilizador.findById(req.params.utilizadorID)
            .exec();


        if (utilizador === null)
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum utilizador com ID ${req.params.utilizadorID}.`
            });

        utilizador.favoritos.push(filme)
        await utilizador.save()

        res.status(200).json({
            message: `Filme adicionado aos favoritos com sucesso!`
        });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Erro ao recuperar o utilizador com ID ${req.params.utilizadorID}.`
        });
    }
};

exports.addLista = async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.filmeID)
            .select('_id')
            .exec();

        if (filme === null) {
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum filme com ID ${req.params.filmeID}.`
            });
        }

        const utilizador = await Utilizador.findById(req.params.utilizadorID)
            .exec();


        if (utilizador === null)
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum utilizador com ID ${req.params.utilizadorID}.`
            });

        utilizador.lista.push(filme)
        await utilizador.save()

        res.status(200).json({
            message: `Filme adicionado aos lista com sucesso!`
        });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Erro ao recuperar o utilizador com ID ${req.params.utilizadorID}.`
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        if (!req.body || !req.body.utilizador || !req.body.palavra_passe) {
            return res.status(400).json({ success: false, msg: "Must provide username and password." });
        }

        let utilizador = await Utilizador.findOne({ where: { nome: req.body.utilizador } });

        if (!utilizador) return res.status(404).json({ success: false, msg: "Utilizador não encontrado." });

        const check = bcrypt.compareSync(req.body.palavra_passe, utilizador.palavra_passe);
        if (!check) return res.status(401).json({ success: false, accessToken: null, msg: "Invalid credentials!" });

        const token = jwt.sign({ id: user.id, role: user.role },
            config.SECRET, {
            expiresIn: '24h' // 24 hours
        });
        
        return res.status(200).json({ success: true, accessToken: token });
    } catch (err) {
        if (err instanceof ValidationError)
            res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            res.status(500).json({ success: false, msg: err.message || "Some error occurred at login." });
    };
};