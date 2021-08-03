require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquire");
const Busquedas = require("./models/Busqueda");

const main = async () => {

    let opt = 0;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const ubicacion = await leerInput('Ciudad: ')

                // Buscar lugar
                const lugares = await busquedas.ciudad(ubicacion)

                // Seleccionar el lugar
                const idSeleccionado = await listarLugares(lugares)

                if(idSeleccionado === '0') continue;
                
                const lugarSel = lugares.find( l => l.id === idSeleccionado )
                
                // Guardar en db
                busquedas.agregarHistorial(lugarSel.nombre)

                // clima datos
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
                console.log(clima)

                console.log('Informacion de la ciudad \n'.green)
                console.log('Ciudad:',lugarSel.nombre)
                console.log('Lat:',lugarSel.lat)
                console.log('Lng:',lugarSel.lng)
                console.log('Temperatura:',clima.temp)
                console.log('Temperatura Minima:',clima.min)
                console.log('Temperatura Maxima:',clima.max)

                break;
            case 2:
                busquedas.historial.forEach( (lugar,i) => {
                    const idx = `${i + 1}. `.green;
                    console.log(`${idx} ${lugar} `)
                })
                break;
            case 0:
                break;
            default:
                break;
        }

        if( opt !==0) await pausa();

    } while (opt !=0);


}

main()
