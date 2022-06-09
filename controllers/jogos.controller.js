const db = require("../models/index.js");
const Jogo = db.jogos;
const Utilizador = db.utilizadores

// Criar e guardar um novo Jogo
exports.create = async (req, res) => {
    // create a document (instance of model Jogo)
    const jogo = new Jogo({
        nome: req.body.nome,
        img: req.body.img,
        tipo: req.body.tipo,
        classificacao: [],
        perguntas: req.body.perguntas,
    });

    try {
        await jogo.save(); // save jogos in the database
        res.status(201).json({ success: true, msg: "Novo Jogo criado.", URL: `/jogos/${jogo._id}` });
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
                success: false, msg: err.message || "Ocorreu algum erro ao criar o jogo."
            });
    }

};

exports.findAll = async (req, res) => {
    const tipo = req.query.tipo;

    // build REGEX to filter tutorials titles with a sub-string - i will do a case insensitive match 
    let condition = tipo ? { tipo: new RegExp(tipo, 'i') } : {};

    try {
        let data = await Jogo
            .find(condition)
            .select('nome img tipo')  // só vai buscar o nome, imagem, tipo
            .exec();
        res.status(200).json({ success: true, jogo: data });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Ocorreu algum erro ao recuperar os jogos."
        });

    }
};

exports.findOne = async (req, res) => {
    try {

        const jogo = await Jogo.findById(req.params.jogoID)
            .exec();

        if (jogo === null) {
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum jogo com ID ${req.params.jogoID}.`
            });
        }

        res.json({ success: true, jogo: jogo });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Erro ao recuperar o jogo com ID ${req.params.jogoID}.`
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const jogo = await Jogo.findByIdAndRemove(req.params.jogoID).exec();
        if (!jogo)
            res.status(404).json({
                message: `Não é possível excluir o jogo com id=${req.params.jogoID}. Talvez o Jogo não tenha sido encontrado!`
            });
        else
            res.status(200).json({
                message: `Jogo id=${req.params.jogoID} foi excluído com sucesso.`
            });
    } catch (err) {
        res.status(500).json({
            message: `Erro ao excluir o jogo com id=${req.params.jogoID}.`
        });
    };
};

exports.findClassificacao = async (req, res) => {
    try {
        const jogo = await Jogo.findById(req.params.jogoID)
            .select('nome classificacao')  //pegar só no nome e na classificação do jogo
            .exec();

        if (jogo === null) {
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum jogo com ID ${req.params.jogoID}.`
            });
        }
        // on success, send the jogos data
        res.json({ success: true, jogo: jogo });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Erro ao recuperar o jogo com ID ${req.params.jogoID}.`
        });
    }
}

exports.addClassificacao = async (req, res) => {
    if (!req.body || !req.body.utilizadorID || !req.body.pontuacao) {
        res.status(400).json({
            message: "Falta informação para poder prosseguir!"
        });
        return;
    }

    try {
        const utilizadorID = await Utilizador.findById(req.body.utilizadorID)
            .select('_id')
            .exec();

        if (utilizadorID === null) {
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum utilizador com ID ${req.body.utilizadorID}.`
            });
        }

        const jogo = await Jogo.findById(req.params.jogoID).exec();

        if (jogo === null) {
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum jogo com ID ${req.params.jogoID}.`
            });
        }

        let novaClassificacao = {
            utilizador: utilizadorID,
            pontuacao: req.body.pontuacao,
        }

        jogo.classificacao.push(novaClassificacao)
        await jogo.save()

        res.status(200).json({
            message: `Classificação adicionado com sucesso!`
        });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Erro ao recuperar o jogo com ID ${req.params.jogoID}.`
        });
    }
};