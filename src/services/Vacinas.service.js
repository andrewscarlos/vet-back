const Animais = require('../model/animais');
const Vacinas = require('../model/vacinas');

const create = async (req, res) => {
   
    const { idAnimal: _id } = req.body;
    const vacinas = Vacinas(req.body)
    console.log('req', req.body)
    const updateVacinas = await Animais.findOne({ _id })
    updateVacinas.vacinas.push(vacinas)
    await updateVacinas.updateOne(updateVacinas, {new: true})
    await vacinas.save()
        .then(response => {

            return res.status(200).json(response)
        }).catch(error => {

            return res.status(500).json(error)
        })
};

const updated = async (req, res) => {
    
    const { idAnimal, idDaVacina } = req.body;
    const vacina = Vacinas(req.body)
    const animail = await Animais.findById({ _id: idAnimal });

    animail.vacinas.map(el => {
        if (el._id == idDaVacina) {
            el.descricao = vacina.descricao || '',
            el.vacina = vacina.vacina || ''
        };
    });
    
    await animail.updateOne(animail, { new: true })
    return res.status(200).json({ msg: 'Atualizado com sucesso' })
};



module.exports = {
    create,
    updated
}