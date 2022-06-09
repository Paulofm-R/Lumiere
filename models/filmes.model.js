module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            nome: { type: String, unique: true, required: [true, 'Porque não nome?'] },
            imagem: { type: String, required: [true, 'Porque não imagem?'] },
            trailer: { type: String, required: [true, 'Porque não trailer?'] },
            tipo: { type: String, enum: { values: ['Filme', 'Serie'], message: '{VALUE} não é suportado' }},
            categoria: { type: Array, required: [true, 'Porque não categoria?'] },
            ano: { type: Number, required: [true, 'Porque não ano?'] },
            realizador: { type: Array, required: [true, 'Porque não realizador?'] },
            produtora: { type: String, required: [true, 'Porque não produtora?'] },
            elenco: { type: Array, required: [true, 'Porque não elenco?'] },
            sinopse: { type: String, required: [true, 'Porque não sinipse?'] },
            classificacao: { type: String, enum: { values: ['M/3', 'M/6', 'M/12', 'M/14', 'M/16', 'M/18'], message: '{VALUE} não é suportado' }},
            avaliacao: { type: Number, required: [false] },
            nAvaliacoes: { type: Number },
            comentarios: { type: Array},
        },
        { timestamps: false }
    );
    // creates a new model Tutorial using the defined schema above
    const Filme = mongoose.model("filmes", schema);
    return Filme;
};