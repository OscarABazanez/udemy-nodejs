const express = require('express')
const cors = require('cors')
const { socketContoller } = require('../sockets/controller')

class Server {

    constructor(){
        this.app        = express();
        this.port       = process.env.PORT;
        this.paths      = {}
        this.server     = require('http').createServer(this.app);
        this.io         = require('socket.io')(this.server);
        

        // Middleware
        this.middleware()
        //rutas
        this.routes();

        // Sockets
        this.sockets()
    } 



    middleware(){
        // Directorio Publico
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use( express.json())
        
        this.app.use( express.static('public'))

    }

    routes(){
        // this.app.use(this.paths.auth, require('../routes/auth'));
        
    }
    sockets(){
        this.io.on("connection", socketContoller);
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`Servidores corriento en el puerto ${this.port}`)
        })
    }
}

module.exports = Server