const { comprobarJTW } = require('../helpers')
const { Socket } = require('socket.io')
const { ChatMensajes } = require('../models')
const chatMensajes = new ChatMensajes()


const socketController = async (socket = new Socket(), io) =>{
    const token = socket.handshake.headers['x-token'];
    const usuario = await comprobarJTW(token)
    if(!usuario){
        return socket.disconnect()
    }

    // Conectarlo a una sala especial
    socket.join( usuario.id ); // global, socket.id, usuario.id


    // agregar al usuario conectado
    chatMensajes.conectarUsuario(usuario)
    io.emit('usuarios-activos', chatMensajes.usuariosArr)
    

    // Eliminar cuando el usuario se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario( usuario.id );
        io.emit('usuarios-activos', chatMensajes.usuariosArr );
    })


    socket.on('enviar-mensaje', ({ uid, mensaje }) => {
        // Conectando a la sala deseada
        if ( uid ) {
            // Mensaje privado
            socket.to( uid ).emit( 'mensaje-privado', { de: usuario.nombre, mensaje });
        } else {
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje );
            io.emit('recibir-mensajes', chatMensajes.ultimos10 );
        }

    })
}

module.exports = {
    socketController
}