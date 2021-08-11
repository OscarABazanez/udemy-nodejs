const dbValidator = require('../helpers/db-validators')
const googleVerify = require('../helpers/google-verify')
const generarJWT = require("../helpers/generar-jwt")


module.exports = {
    ...dbValidator,
    ...googleVerify,
    ...generarJWT,
}