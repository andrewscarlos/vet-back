const Animais = require('../model/animais');
const Pessoas = require('../model/pessoas');


const index = async(req, res) =>{
    await Animais.find()
    .then(response=>{
        return res.status(200).json(response)
    })
    .catch(error=>{
        return res.status(500).json(error)
    })
}

const show = async(req, res) =>{
    await Animais.findById(req.params.id)
    .then(response=>{
        if (response)return res.status(200).json(response)
        else return res.status(404).json("Id não encontrado ")
    })
    .catch(error=>{
        return res.status(500).json(error)
    })
    
}

const create = async(req, res) =>{
    const { cpf } =  req.body;
    
    const updatedPeople = await Pessoas.findOne({ cpf })

    if(!updatedPeople){
        res.status(400).json({error: 'Não existe uma pessoa com esse CPF'})
    };

    updatedPeople.animais.push(req.body)

    const newPeole = {
        ...updatedPeople._doc
    }
    
    const pessoa = await Pessoas.findById(newPeole._id)
   
    const pessoaAtual = await pessoa.updateOne( newPeole, {new: true})
    

    const animais = Animais(req.body)
    await animais.save()
    .then(response => {
        return res.status(200).json(response)
    }).catch(error=>{
        return res.status(500).json(error)
    })
}

const update = async(req, res) =>{
    const animais = await Animais.findById(req.params.id)

    await animais.updateOne( req.body, {new: true})
    .then(response=>{
        return res.status(200).json(response)
    })
    .catch(error=>{
        return res.status(500).json(error)
    })
}
const destroy = async (req, res)=>{
    const animais = await Animais.findById(req.params.id)
    animais.remove(req.body)
    .then((response)=>{
        return res.status(200).json(response)
    })
    .catch(error=>{
        return res.status(500).json(error)
    })
}


module.exports = {
    index,
    show,
    create,
    update,
    destroy
}