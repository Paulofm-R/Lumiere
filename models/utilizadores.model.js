module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            nome: { type: String, unity: true, required: [true, 'Porque não nome?'] },
            palavra_passe: { type: String, required: [true, 'Porque não palavra_passe?'] },
            data_nascimento: { type: String, required: [true, 'Porque não data_nascimento?'] },
            foto: { type: String, required: [false] },
            tipo: { type: String, enum: { values: ['utilizador', 'admin'], default: 'utilizador', message: '{VALUE} não é suportado' } },
            favoritos: { type: Array, required: [false] },
            lista: { type: Array, required: [false] },
            numJogos: { type: Number, required: [false] },
            desafios: { type: Array, required: [false] },
            desafiosConcluidos: { type: Array, required: [false] }
        },
        { timestamps: false }
    );
    // creates a new model Tutorial using the defined schema above
    const Utilizador = mongoose.model("utilizadores", schema);
    return Utilizador;
};