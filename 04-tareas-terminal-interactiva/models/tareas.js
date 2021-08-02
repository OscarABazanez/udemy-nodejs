const Tarea = require("./tarea")

class Tareas {

    get listadoArr(){
        const listado = []

        Object.keys(this._listado).forEach( key=> {
            listado.push(this._listado[key])
        } )

        return listado
    }

    constructor(){
        this._listado = {}
    }
    
    cargarTareasFromArray( tareas= []){
        tareas.forEach(tareas => {
            this._listado[tareas.id] = tareas
        });
    }

    crearTarea( desc = ''){
        
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea

    }
    borrarTarea(id =''){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }
    listadoCompleto(){
        // console.log(this._listado)
        this.listadoArr.forEach( (tarea,i) => {
            const {desc, completadoEn} = tarea
            const idx = `${i + 1}`.green
            const estado = (completadoEn)? 'Compleado'.green : 'Pendiente'.red
            console.log(`${idx} - ${desc}, ${estado} `)
        });
    }

    listarPendientesCompletadas( completadas = true) {

        let contador = 0

        this.listadoArr.forEach( (tarea,i) => {
            
            const {desc, completadoEn} = tarea
            // const idx = `${i + 1}`.green
            const estado = (completadoEn)? 'Compleado'.green : 'Pendiente'.red
            if(completadas){
                if(completadoEn){
                    contador += 1;
                    console.log(`${contador.toString().green} - ${desc}, ${estado} :: ${completadoEn.green}`)
                }
            }else{
                if(!completadoEn){
                    contador += 1;
                    console.log(`${contador.toString().green} - ${desc}, ${estado} `)
                }
            }

        });
    }

    toggleCompletadas (ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id]
            if( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            }
        })

    }
}

module.exports = Tareas