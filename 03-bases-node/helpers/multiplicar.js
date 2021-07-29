const fs = require('fs');


const crearArchivo = async (base = 5) =>{
    try {
        let salida = `Tabla del ${base} \n`;

        for (let index = 1; index <= 10; index++) {
            salida += `${base} x ${index} = ${base*index}\n`;
        }
    
        fs.writeFile(`tabla-del-${base}.txt`, salida, (err) =>{
            if(err) throw err;
            console.log('tabla creada');
        })
    
        return 'Tabla creada';
    } catch (err) {
        throw err;
    }
}

module.exports = {
    crearArchivo: crearArchivo
}