const { crearArchivo } = require('./helpers/multiplicar');
// node app.js --base=5 --base2=111 En terminal
const argv = require('yargs').argv;
console.log('base yargs: ',argv.base)
console.log('base yargs: ',argv.base2)


const base = 532

// crearArchivo(base)
//     .then( nombreArchivo => console.log(nombreArchivo, 'Creado'))
//     .catch( err => console.log(err))



