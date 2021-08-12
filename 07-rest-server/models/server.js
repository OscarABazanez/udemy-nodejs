const express = require('express')
const cors = require('cors')
const { dbConection } = require('../database/config')
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            user:           '/v1/user',
            pay:            '/v1/pay',
            auth:           '/v1/auth',
            categorias:     '/v1/categorias',
            productos:      '/v1/productos',
            buscar:         '/v1/buscar',
        }

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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.pay, require('../routes/pay'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidores corriento en el puerto ${this.port}`)
        })
    }
}

module.exports = Server