const mongoose = require('../config/database')
const Schema = mongoose.Schema

const ProntuariosShema = new Schema({
    idAnimal: {type: String},
    data: {type: Date},
    veterinario: { type: String, required: true },
    peso: { type: String, required: true },
    idade: { type: String, required: true},
    descricao: { type: String },
    progresso: {type: String},
    resultado: { type: String,  },
    temperatura: { type: String },
    frequenciaRespiratoria: { type: String },
    frequenciaCardiaca: { type: String },
    tempoPreenchimentoCapilar:{ type: String },
    mucosas: {type: String},
    hidratacao: {type: String},
    ectoparasitos: {type: String},
    exameFisico: {type: String}
}, {
    timestamps: true
})

const Prontuarios = mongoose.model('Prontuarios', ProntuariosShema)

module.exports = Prontuarios