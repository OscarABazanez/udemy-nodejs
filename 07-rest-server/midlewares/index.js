const validaCampos = require('../midlewares/validar-campos')
const validaJWT = require('../midlewares/validar-jwt')
const validaRoles = require('../midlewares/validar-roles')
const validarArchivo = require('../midlewares/validar-archivo')

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validarArchivo,
}