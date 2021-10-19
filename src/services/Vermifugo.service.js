const Animais = require('../model/animais');
const Vermifugo = require('../model/vermifugos');

const create = async (req, res) => {
    
    const { idAnimal: _id } = req.body;
    const vermifugo = Vermifugo(req.body)
    const updatedVermifugo = await Animais.findOne({ _id })
    updatedVermifugo.vermifugos.push(vermifugo)
    await updatedVermifugo.updateOne(updatedVermifugo, {new: true})
    await vermifugo.save()
        .then(response => {

            return res.status(200).json(response)
        }).catch(error => {

            return res.status(500).json(error)
        })
};

const updated = async (req, res) => {
  
    const { idAnimal, idDovermifugo} = req.body;
    const vermifugo = Vermifugo(req.body)
    const animail = await Animais.findById({ _id: idAnimal });

    animail.vermifugos.map(el => {
        if (el._id == idDovermifugo) {
            el.descricao = vermifugo.descricao || '',
            el.vermifugo = vermifugo.vermifugo || ''
        };
    });
    
    await animail.updateOne(animail, { new: true })
    return res.status(200).json({ msg: 'Atualizado com sucesso' })
};



module.exports = {
    create,
    updated
}