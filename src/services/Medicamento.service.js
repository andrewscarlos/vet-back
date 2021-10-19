const Animais = require('../model/animais');
const Medicamentos = require('../model/medicamentos');

const create = async (req, res) => {
   
    const { idAnimal: _id } = req.body;
    const medicamentos = Medicamentos(req.body)
    const updatedMedicamento = await Animais.findOne({ _id })
    updatedMedicamento.medicamentos.push(medicamentos)
    await updatedMedicamento.updateOne(updatedMedicamento, {new: true})
    await medicamentos.save()
        .then(response => {

            return res.status(200).json(response)
        }).catch(error => {

            return res.status(500).json(error)
        })
};

const updated = async (req, res) => {
    const { idAnimal, idDoMedicamento } = req.body;
    const medicamento = Medicamentos(req.body)
    const animail = await Animais.findById({ _id: idAnimal });

    animail.medicamentos.map(el => {
        if (el._id == idDoMedicamento) {
            el.descricao = medicamento.descricao || '',
            el.medicamento = medicamento.medicamento || ''
        };
    });
    
    await animail.updateOne(animail, { new: true })
    return res.status(200).json({ msg: 'Atualizado com sucesso' })
};



module.exports = {
    create,
    updated
}