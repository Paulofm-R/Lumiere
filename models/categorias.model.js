module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            categoria: { type: String, unique: true, required: [true, 'Porque não categoria?'] },
        },
        { timestamps: false }
    );
    // creates a new model Tutorial using the defined schema above
    const Categoria = mongoose.model("categorias", schema);
    return Categoria;
};