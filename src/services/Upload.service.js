const Animais = require('../model/animais');

const update = async (req, res) => {
  try {

    const animais = await Animais.findOne({ _id: req.params.id });
    console.log('animais',animais)
    const item = req.files;
    await animais.updateOne({
      foto: item[0].filename, 
  });


  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  update,
};
