const mongoose = require('../config/database')
const Schema = mongoose.Schema

const TratamentosShema = new Schema({
    idAnimal: {type: String},
    data: {type: Date},
    veterinario: { type: String, required: true },
    descricao: { type: String },
    tratamento: {type: String},
}, {
    timestamps: true
})

const Tratamentos = mongoose.model('Tratamentos', TratamentosShema)

module.exports = Tratamentos