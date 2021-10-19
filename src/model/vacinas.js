const mongoose = require('../config/database')
const Schema = mongoose.Schema

const VacinasShema = new Schema({
    idAnimal: {type: String},
    data: {type: Date},
    veterinario: { type: String, required: true },
    descricao: { type: String },
    vacina: {type: String},
    primeiraDose:{type: Boolean},
    segundaDose:{type: Boolean},
}, {
    timestamps: true
})

const Vacinas = mongoose.model('Vacinas', VacinasShema)

module.exports = Vacinas