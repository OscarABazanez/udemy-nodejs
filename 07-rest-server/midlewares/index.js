const validaCampos = require('../midlewares/validar-campos')
const validaJWT = require('../midlewares/validar-jwt')
const validaRoles = require('../midlewares/validar-roles')

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
}