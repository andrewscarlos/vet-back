const Animais = require('../model/animais');
const Prontuarios = require('../model/prontuarios');

const create = async (req, res) => {

    const { idAnimal: _id } = req.body;
    const prontuarios = Prontuarios(req.body)

    const updatedAnimal = await Animais.findOne({ _id })
    updatedAnimal.prontuarios.push(prontuarios)

    await updatedAnimal.updateOne(updatedAnimal, { new: true })
    await prontuarios.save()
        .then(response => {

            return res.status(200).json(response)
        }).catch(error => {

            return res.status(500).json(error)
        })
};

const updated = async (req, res) => {
    console.log('vateu no update')
    const { idAnimal, idDoProntuario } = req.body;
    const prontuario = Prontuarios(req.body)

    const animail = await Animais.findById({ _id: idAnimal });



    animail.prontuarios.map(el => {
        if (el._id == idDoProntuario) {
            el = {el, ...prontuario}
        }
    });
    console.log('animail',animail)
    await animail.updateOne(animail, { new: true })
    await Prontuarios.updateOne(prontuario, { new: true })
    return res.status(200).json({ msg: 'Atualizado com sucesso' })
}


module.exports = {
    create,
    updated
}