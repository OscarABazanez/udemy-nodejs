const express = require('express')
const cors = require('cors')
const { dbConection } = require('../database/config')
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/v1/user'
        this.userPay = '/v1/pay'

        // Conectar a la BD
        this.conectarDB()

        // Middleware
        this.middleware()
        //rutas
        this.routes();
    } 

    async conectarDB(){
        await dbConection()
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
        this.app.use(this.userPay, require('../routes/pay'));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidores corriento en el puerto ${this.port}`)
        })
    }
}

module.exports = Server