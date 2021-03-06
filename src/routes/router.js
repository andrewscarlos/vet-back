const express = require('express');
const routes = express.Router();

const multer = require('multer');
const configUpload = require('../config/uploads');
const upload = multer(configUpload);

const authMiddleware = require('../middlewares/auth')

const PessoasService = require('../services/Pessoas.service');
const AnimaisService = require('../services/Animais.service');
const UserService = require('../services/AuthUser.service');
const RolesService = require('../services/Roles.service');
const PermissionService = require('../services/Permission.service');
const ProntuariosService = require('../services/Prontuarios.service');
const TratamentosService = require('../services/Tratamentos.service');
const AlergiasService = require('../services/Alergias.service');
const MedicamentoServive =  require('../services/Medicamento.service');
const VacinasService =  require('../services/Vacinas.service');
const VermifugosService =  require('../services/Vermifugo.service');
const UploadService = require('../services/Upload.service');

routes.post('/permission', PermissionService.create)
routes.get('/permission', PermissionService.index)

routes.post('/roles', RolesService.create)
routes.get('/roles', RolesService.index)

routes.post('/register', UserService.create)
routes.get('/register/all', UserService.index)

routes.post('/register/authenticate', UserService.authenticate)

routes.patch('/userupdate', UserService.update)


//routes.use(authMiddleware);

routes.get('/pessoas', PessoasService.index)
routes.post('/pessoas/fetch', PessoasService.show)
routes.post('/pessoas',PessoasService.create)
routes.put('/pessoas/:id', PessoasService.update)
routes.delete('/pessoas/:id', PessoasService.destroy)


routes.get('/animais', AnimaisService.index)
routes.get('/animais/:id', AnimaisService.show)
routes.put('/animais/upload/:id', upload.array('file'), UploadService.update)
routes.post('/animais', AnimaisService.create)
routes.put('/animais/:id', AnimaisService.update)
routes.delete('/animais/:id', AnimaisService.destroy)
routes.get('/animaistoday', AnimaisService.today)
routes.post('/animaisdays', AnimaisService.getBydays)


routes.post('/animais/prontuarios', ProntuariosService.create)
routes.patch('/animais/prontuarios', ProntuariosService.updated)

routes.post('/animais/tratamentos', TratamentosService.create)
routes.patch('/animais/tratamentos', TratamentosService.updated)

routes.post('/animais/alergias', AlergiasService.create)
routes.patch('/animais/alergias', AlergiasService.updated)

routes.post('/animais/medicamentos', MedicamentoServive.create)
routes.patch('/animais/medicamentos', MedicamentoServive.updated)

routes.post('/animais/vacinas', VacinasService.create)
routes.patch('/animais/vacinas', VacinasService.updated)

routes.post('/animais/vermifugos', VermifugosService.create)
routes.patch('/animais/vermifugos', VermifugosService.updated)


module.exports = routes;