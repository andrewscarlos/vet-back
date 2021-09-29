const express = require('express')
const routes = express.Router()

const authMiddleware = require('../middlewares/auth')

const PessoasService = require('../services/Pessoas.service')
const AnimaisService = require('../services/Animais.service')
const UserService = require('../services/AuthUser.service')
const RolesService = require('../services/Roles.service')
const PermissionService = require('../services/Permission.service')
const ProntuariosService = require('../services/Prontuarios.service')
const TratamentosService = require('../services/Tratamentos.service')
const AlergiasService = require('../services/Alergias.service')

routes.post('/permission', PermissionService.create)
routes.get('/permission', PermissionService.index)

routes.post('/roles', RolesService.create)
routes.get('/roles', RolesService.index)

routes.post('/register', UserService.create)
routes.post('/register/authenticate', UserService.authenticate)

//routes.use(authMiddleware);

routes.get('/pessoas', PessoasService.index)
routes.get('/pessoas/:id', PessoasService.show)
routes.post('/pessoas',PessoasService.create)
routes.put('/pessoas/:id', PessoasService.update)
routes.delete('/pessoas/:id', PessoasService.destroy)


routes.get('/animais', AnimaisService.index)
routes.get('/animais/:id', AnimaisService.show)
routes.post('/animais', AnimaisService.create)
routes.put('/animais/:id', AnimaisService.update)
routes.delete('/animais/:id', AnimaisService.destroy)

routes.post('/animais/prontuarios', ProntuariosService.create)
routes.patch('/animais/prontuarios', ProntuariosService.updated)

routes.post('/animais/tratamentos', TratamentosService.create)
routes.patch('/animais/tratamentos', TratamentosService.updated)

routes.post('/animais/tratamentos', AlergiasService.create)
routes.patch('/animais/tratamentos', AlergiasService.updated)




module.exports = routes;