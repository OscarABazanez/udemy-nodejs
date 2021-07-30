const { crearArchivo } = require('./helpers/multiplicar');
// node app.js --base=5 --base2=111 En terminal
const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        demandOption: false,
        default: false
    })
    .check((argv, options) => {
        if( isNaN(argv.b)){
            throw 'La base tiene que ser un numero'
        }
        return true;
    })
    .argv;

const base = argv.b
const lista = argv.l
console.log('base yargs: ',base)



// const base = 5324

crearArchivo(base,lista)
    .then( nombreArchivo => console.log(nombreArchivo, 'Creado'))
    .catch( err => console.log(err))



