module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            nome: { type: String, required: [true, 'Why no nome?'] },
            img: { type: String, required: [true, 'Why no imagem']},
            tipo: { type: String, required: [true, 'Why no tipo']},
            perguntas: { type: Array, required: [true, 'Why no perguntas']},
            classificacao: { type: Array, required: [false]}
        },
        { timestamps: false }
    );
    // creates a new model Tutorial using the defined schema above
    const Jogo = mongoose.model("jogos", schema);
    return Jogo;
};