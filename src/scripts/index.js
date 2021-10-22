const User = require('../model/user');
const bcrypt = require("bcryptjs");
const { generateToken } = require('../services/AuthUser.service');

const insertPoliceAndRoles = async ()=>{
    
};

const createMasterUser = async ()=>{
    const nome = 'H-vet-Resende';
    const email = 'andrews.knct@gmail.com';
    const senha = '123456';
    const funcao = 'Administrativo'
    try{
        if(!await User.findOne({ nome })){
            const user = User({nome,email,senha,funcao})
            const masterAdmin = await user.save()
            token = await generateToken({id: user.id })
            return { masterAdmin, token }
        }
    }catch(err){
        return json({err})
    }
};

const handler = async()=>{
    await insertPoliceAndRoles()
    await createMasterUser()
};

module.exports ={
    handler
}