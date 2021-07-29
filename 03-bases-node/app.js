const { crearArchivo } = require('./helpers/multiplicar');

const base = 52

crearArchivo(base)
    .then( nombreArchivo => console.log(nombreArchivo, 'Creado'))
    .catch( err => console.log(err))