const mongoose = require('../config/database')
const Schema = mongoose.Schema

const MedicamentosShema = new Schema({
    idAnimal: {type: String},
    data: {type: Date},
    veterinario: { type: String, required: true },
    descricao: { type: String },
    medicamento: {type: String},
}, {
    timestamps: true
})

const Medicamentos = mongoose.model('Medicamentos', MedicamentosShema)

module.exports = Medicamentos