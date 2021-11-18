const mongoose = require("../config/database");
const Schema = mongoose.Schema;

const AlergiasShema = new Schema(
  {
    idAnimal: { type: String },
    data: { type: Date },
    veterinario: { type: String, required: true },
    descricao: { type: String },
    alergias: { type: String },
  },
  {
    timestamps: true,
  }
);

const Alergias = mongoose.model("Alergias", AlergiasShema);

module.exports = Alergias;
