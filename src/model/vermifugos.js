const mongoose = require('../config/database')
const Schema = mongoose.Schema

const VermifugoShema = new Schema({
    idAnimal: {type: String},
    data: {type: Date},
    veterinario: { type: String, required: true },
    descricao: { type: String },
    vermifugo: {type: String},
    primeiraDose:{type: Boolean},
    segundaDose:{type: Boolean},
}, {
    timestamps: true
})

const Vermifugo = mongoose.model('Vermifugo', VermifugoShema)

module.exports = Vermifugo