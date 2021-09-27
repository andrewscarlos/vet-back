const Animais = require('../model/animais');
const Prontuarios = require('../model/prontuarios');

const create = async (req, res) => {
   
    const { idAnimal: _id } = req.body;

    const prontuarios = Prontuarios(req.body)

    const updatedAnimal = await Animais.findOne({ _id })

    updatedAnimal.prontuarios.push(prontuarios)
    const x = await updatedAnimal.updateOne(updatedAnimal, {new: true})
    console.log('x',x)
    
    await prontuarios.save()
        .then(response => {

            return res.status(200).json(response)
        }).catch(error => {

            return res.status(500).json(error)
        })
};



module.exports = {
    create
}