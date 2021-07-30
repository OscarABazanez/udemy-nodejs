const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs')

const base = argv.b
const lista = argv.l

crearArchivo(base,lista)
    .then( nombreArchivo => console.log(nombreArchivo, 'Creado'))
    .catch( err => console.log(err))



