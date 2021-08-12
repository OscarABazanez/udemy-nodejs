const usuario = require('../controllers/user')
const pay = require('../controllers/pay')
const auth = require('../controllers/auth')
const categoria = require('../controllers/categorias')
const productos = require('../controllers/productos')
const buscador = require('../controllers/buscar')

module.exports = {
    ...usuario,
    ...pay,
    ...auth,
    ...categoria,
    ...productos,
    ...buscador,
}