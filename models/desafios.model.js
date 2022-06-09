module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            nome: { type: String, unique: true, required: [true, 'Porque não nome?'] },
            nEtapas: { type: Number, required: [true, 'Porque não número de etapas?'] },
            imagem: { type: String, required: [true, 'Porque não uma imagem?'] }
        },
        { timestamps: false }
    );
    // creates a new model Tutorial using the defined schema above
    const Desafio = mongoose.model("desafios", schema);
    return Desafio;
};