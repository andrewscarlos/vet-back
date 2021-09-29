const Animais = require('../model/animais');
const Alergias = require('../model/alergias');

const create = async (req, res) => {
   
    const { idAnimal: _id } = req.body;
    const alergias = Alergias(req.body)
    const updatedAnimal = await Animais.findOne({ _id })
    updatedAnimal.alergias.push(alergias)
    await updatedAnimal.updateOne(updatedAnimal, {new: true})
    await alergias.save()
        .then(response => {

            return res.status(200).json(response)
        }).catch(error => {

            return res.status(500).json(error)
        })
};

const updated = async (req, res) => {
    const { idAnimal, idDoTratamento } = req.body;
    const alergias = Alergias(req.body)
    const animail = await Animais.findById({ _id: idAnimal });

    animail.alergias.map(el => {
        if (el._id == idDoTratamento) {
            el.descricao = alergias.descricao || '',
            el.alergias = alergias.alergias || ''
        };
    });
    
    await animail.updateOne(animail, { new: true })
    return res.status(200).json({ msg: 'Atualizado com sucesso' })
};



module.exports = {
    create,
    updated
}