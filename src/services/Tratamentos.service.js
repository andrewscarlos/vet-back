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



module.exports = {
    create
}