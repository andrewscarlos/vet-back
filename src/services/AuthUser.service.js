const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
};
const create = async (req, res) => {
  const { email, cpf } = req.body;
  if (await User.findOne({ email, cpf })) {
    return res
      .status(400)
      .json({ error: "Ja existe um CPF ou Email cadastrado" });
  }
  const user = User({ ...req.body });

  await user
    .save()
    .then((response) => {
      return res
        .status(200)
        .json({ response, token: generateToken({ id: user.id }) });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
const index = async (req, res) => {
  await User.find()
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

const update = async (req, res) => {
  const { cpf, senha } = req.body;
  const user = await User.findOne({ cpf });

  if(senha){
    const hash = await bcrypt.hash(senha, 10);
    req.body.senha = hash
  }else{
    req.body.senha = user.senha
  }
  

  await user.updateOne(req.body, { new: true })
    .then((response) => {
      return res.status(200).json(response);
    })



    
    .catch((error) => {
      return res.status(500).json(error);
    });
};

const authenticate = async (req, res) => {

  console.log('REQUISIÇÃO', req.body)

  const { email, password: senha } = req.body;

  if (!email && !senha) {
    return res.status(400).json({ err: "Credencias nãooooooo enviadas" });
  }
  const user = await User.findOne({ email }).select("+senha");

  if (!user) {
    return res.status(400).json({ error: "Usuario não encontrado" });
  }
  if (!(await bcrypt.compare(senha, user.senha))) {
    return res.status(400).json({ error: "Invalid Password" });
  }

  return res.status(200).json({ user, token: generateToken({ id: user.id }) });
};

module.exports = {
  create,
  authenticate,
  generateToken,
  index,
  update
};

