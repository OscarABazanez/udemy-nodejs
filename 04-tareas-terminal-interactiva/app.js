require("colors");
const {
    inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareaBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquire');
const Tareas = require("./models/tareas");

const {guardarDB, leerDB} = require('./helpers/guardarArchivo')

const main = async () => {

    const tareas = new Tareas();
    let opt = '';

    const tareasDB = leerDB()
    if(tareasDB){
        //Establecer tareas
        tareas.cargarTareasFromArray( tareasDB)
    }
    
    do {
        // Imprime el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1': // Crear opcion
                const desc = await leerInput('Descripcion:')
                tareas.crearTarea(desc)
                break;
            case '2': // Listado
                tareas.listadoCompleto()
                break;
            case '3': // Listado de tareas si pendientes
                tareas.listarPendientesCompletadas(true)
                break;
            case '4': // Listado de tareas no pendientes
                tareas.listarPendientesCompletadas(false)
                break;
            case '5': // Completar tareas
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break;
            case '6': // Borrar
                const id = await listadoTareaBorrar(tareas.listadoArr)
                if(id !== "0"){
                    // Preguntar si esta seguro de borrarlo
                    const porBorrar = await confirmar('Estas seguro?')
                    if(porBorrar){
                        tareas.borrarTarea(id)
                    }
                }

                break;
            default:
                break;
        }
        
        guardarDB( tareas.listadoArr )

        await pausa()

    } while (opt != '0');


}

main()