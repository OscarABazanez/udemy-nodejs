const dbValidator = require('../helpers/db-validators')
const googleVerify = require('../helpers/google-verify')
const generarJWT = require("../helpers/generar-jwt")
const subirArchivos = require("../helpers/subir-archivo")


module.exports = {
    ...dbValidator,
    ...googleVerify,
    ...generarJWT,
    ...subirArchivos,
}