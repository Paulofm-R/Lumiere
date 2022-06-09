module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            nome: { type: String, unique: true, required: [true, 'Why no nome?'] },
            img: { type: String, required: [true, 'Why no imagem'] },
            tipo: { type: String, enum: { values: ['Quizz', 'Preencher', 'Lista'], message: '{VALUE} não é suportado' } },
            perguntas: { type: Array, required: [true, 'Why no perguntas'] },
            classificacao: { type: Array, required: [false] }
        },
        { timestamps: false }
    );
    // creates a new model Tutorial using the defined schema above
    const Jogo = mongoose.model("jogos", schema);
    return Jogo;
};