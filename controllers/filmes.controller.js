const db = require("../models/index.js");
const Filme = db.filmes;
const Utilizador = db.utilizadores

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
        if (req.UtilizadorAutenticadoRole !== "admin") {
            return res.status(403).json({
                success: false, msg: "Esta solicitação só é possivel para ADMINISTRADORES!"
            });
        }

        await filme.save(); // save Filme in the database
        res.status(201).json({ success: true, msg: "Novo Filme criado.", URL: `/filmes/${filme._id}` });
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
                success: false, msg: err.message || "Ocorreu algum erro ao criar o filme."
            });
    }

};

// Recuperar todos os filmes / localizar por título
exports.findAll = async (req, res) => {
    const nome = req.query.nome;

    let condition = nome ? { nome: new RegExp(nome, 'i') } : {};

    try {
        let data = await Filme
            .find(condition)
            .select('nome imagem tipo categoria elenco avaliacao')  // só vai buscar o nome, imagem, tipo, categoria, elenco e avaliação
            .exec();
        res.status(200).json({ success: true, filme: data });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Ocorreu algum erro ao recuperar os filmes."
        });

    }
};

// Encontre um único filme com um id
exports.findOne = async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.filmeID)
            .exec();
        // no data returned means there is no filme in DB with that given ID 
        if (filme === null)
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum filme com ID ${req.params.filmeID}.`
            });
        // on success, send the filme data
        res.json({ success: true, filme: filme });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Erro ao recuperar o filme com ID ${req.params.filmeID}.`
        });
    }
};

// Excluir um filme com o id especificado na solicitação
exports.delete = async (req, res) => {
    try {
        if (req.UtilizadorAutenticadoRole !== "admin") {
            return res.status(403).json({
                success: false, msg: "Esta solicitação só é possivel para ADMINISTRADORES!"
            });
        }

        const filme = await Filme.findByIdAndRemove(req.params.filmeID).exec();
        if (!filme)
            res.status(404).json({
                message: `Não é possível excluir o filme com id=${req.params.filmeID}. Talvez o Filme não tenha sido encontrado!`
            });
        else
            res.status(200).json({
                message: `Filme id=${req.params.filmeID} foi excluído com sucesso.`
            });
    } catch (err) {
        res.status(500).json({
            message: `Erro ao excluir o filme com id=${req.params.filmeID}.`
        });
    };
};

// Comentarios
exports.addComentario = async (req, res) => {
    if (!req.body || !req.body.utilizadorID || !req.body.comentario) {
        res.status(400).json({
            message: "Campos em falta!"
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

        const filme = await Filme.findById(req.params.filmeID)
            .exec();
        // no data returned means there is no filme in DB with that given ID 
        if (filme === null)
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum filme com ID ${req.params.filmeID}.`
            });

        let novoId = filme.comentarios.length
        let novoComentario = {
            id: novoId,
            utilizador: utilizadorID._id,
            comentario: req.body.comentario,
            spoiler: false
        }

        filme.comentarios.push(novoComentario)
        await filme.save()

        res.status(200).json({
            message: `Comentario adicionado com sucesso!`
        });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Erro ao recuperar o filme com ID ${req.params.filmeID}.`
        });
    }
};

exports.updateComentario = async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.filmeID)
            .exec();

        if (filme === null) {
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum filme com ID ${req.params.filmeID}.`
            });
        }

        const comentario = filme.comentarios.find(comentario => comentario.id == req.params.comentarioID)
        
        if (comentario === null) {
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum comentario com ID ${req.params.comentarioID}.`
            });
        }
        
        comentario.spoiler = req.body.spoiler;
        const resultado = await Filme.findByIdAndUpdate(req.params.filmeID, filme,
            {
                returnOriginal: false,
                runValidators: true,
                useFindAndModify: false
            }
        ).exec();

        if (resultado === null) {
            res.status(404).json({ msg: `Não é possível atualizar o comentario com id=${req.params.comentarioID}.`})
            return
        }  
        
        res.status(200).json({
            message: `Comentario alterado com sucesso!`
        });
    }
    catch (err) {
        if (err.name === "ValidationError") {
            let errors = {};

            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });

            return res.status(400).send(errors);
        }
        res.status(500).json({
            success: false, msg: `Erro ao recuperar o filme com ID ${req.params.filmeID}.`
        });
    }
};

// Avaliação
exports.updateAvaliacao = async (req, res) => {
    if (!req.body || !req.body.avaliacao) {
        res.status(400).json({
            message: "Campos em falta!"
        });
        return;
    }
    try {
        const filme = await Filme.findById(req.params.filmeID)
            .exec();

        if (filme === null) {
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum filme com ID ${req.params.filmeID}.`
            });
        }

        let avaliacaoAtual = filme.avaliacao;
        let nAvaliacoesAtual = filme.nAvaliacoes;

        let novoNumAvaliacao = nAvaliacoesAtual + 1;
        let novaAvaliacao = ((avaliacaoAtual * nAvaliacoesAtual) + req.body.avaliacao) / novoNumAvaliacao;

        filme.avaliacao = novaAvaliacao.toFixed(1);
        filme.nAvaliacoes = novoNumAvaliacao;

        await filme.save()

        res.status(200).json({
            message: `Avaliação alterado com sucesso!`
        });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Erro ao recuperar o filme com ID ${req.params.filmeID}.`
        });
    }
};