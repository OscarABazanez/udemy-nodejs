const usuario = require('../controllers/user')
const pay = require('../controllers/pay')
const auth = require('../controllers/auth')

module.exports = {
    ...usuario,
    ...pay,
    ...auth,
}