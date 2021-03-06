const Animais = require('../model/animais');
const Tratamento = require('../model/tratamentos');

const create = async (req, res) => {
   
    const { idAnimal: _id } = req.body;
    const tratamentos = Tratamento(req.body)
    const updatedAnimal = await Animais.findOne({ _id })
    updatedAnimal.tratamentos.push(tratamentos)
    await updatedAnimal.updateOne(updatedAnimal, {new: true})
    await tratamentos.save()
        .then(response => {

            return res.status(200).json(response)
        }).catch(error => {

            return res.status(500).json(error)
        })
};

const updated = async (req, res) => {
    const { idAnimal, idDoTratamento } = req.body;
    const tratamento = Tratamento(req.body)
    const animail = await Animais.findById({ _id: idAnimal });

    animail.tratamentos.map(el => {
        if (el._id == idDoTratamento) {
            el.descricao = tratamento.descricao || '',
            el.tratamento = tratamento.tratamento || ''
        };
    });
    
    await animail.updateOne(animail, { new: true })
    return res.status(200).json({ msg: 'Atualizado com sucesso' })
};



module.exports = {
    create,
    updated
}