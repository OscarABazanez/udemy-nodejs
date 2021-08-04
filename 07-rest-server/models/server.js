const express = require('express')
const cors = require('cors')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/v1/user'

        // Middleware
        this.middleware()
        //rutas
        this.routes();
    } 

    middleware(){
        // Directorio Publico
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use( express.json())
        
        this.app.use( express.static('public'))
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user'));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidores corriento en el puerto ${this.port}`)
        })
    }
}

module.exports = Server