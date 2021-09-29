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
    console.log('req. body', req.body)
    const { idAnimal, idDoProntuario } = req.body;
    const prontuario = Prontuarios(req.body)
    const animail = await Animais.findById({ _id: idAnimal });
    


    animail.prontuarios.map(el => {
        if (el._id == idDoProntuario) {
            el.peso = prontuario.peso || '',
            el.idade = prontuario.idade || '',
            el.descricao = prontuario.descricao || '',
            el.progresso = prontuario.progresso || '',
            el.resultado = prontuario.resultado || '',
            el.temperatura = prontuario.temperatura || '',
            el.frequenciaRespiratoria = prontuario.frequenciaRespiratoria || '',
            el.frequenciaCardiaca = prontuario.frequenciaCardiaca || '', 
            el.tempoPreenchimentoCapilar = prontuario.tempoPreenchimentoCapilar || '',
            el.mucosas = prontuario.mucosas || '',
            el.hidratacao = prontuario.hidratacao || '',
            el.ectoparasitos = prontuario.ectoparasitos || '',
            el.exameFisico = prontuario.exameFisico || ''
        }
    });
    
    await animail.updateOne(animail, { new: true })
    return res.status(200).json({ msg: 'Atualizado com sucesso' })
}


module.exports = {
    create,
    updated
}