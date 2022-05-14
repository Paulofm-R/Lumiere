module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            nome: { type: String, required: [true, 'Porque não nome?'] },
            imagem: { type: String, required: [true, 'Porque não imagem?']},
            trailer: { type: String, required: [true, 'Porque não trailer?']},
            tipo: { type: String, required: [true, 'Porque não tipo?']},
            categoria: { type: Array, required: [true, 'Porque não categoria?']},
            ano: { type: Number, required: [true, 'Porque não ano?']},
            realizador: { type: Array, required: [true, 'Porque não realizador?']},
            produtora: { type: String, required: [true, 'Porque não produtora?']},
            elenco: { type: Array, required: [true, 'Porque não elenco?']},
            sinopse: { type: String, required: [true, 'Porque não sinipse?']},
            classificacao: { type: String, required: [true, 'Porque não classificacao?']},
            avaliacao: { type: Number, required: [false]},
            nAvaliacoes: { type: Number, required: [false]},
            comentarios: { type: Array, required: [false]},
        },
        { timestamps: false }
    );
    // creates a new model Tutorial using the defined schema above
    const Filme = mongoose.model("filmes", schema);
    return Filme;
};