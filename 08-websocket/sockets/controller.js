const socketContoller = (socket) => {
    console.log("cliente conectado",socket.id)

    socket.on('disconnect', () =>{
        console.log("cliente desconectado su id:",socket.id)
    })

    socket.on('enviar-mensaje', ( payload, callback ) =>{

        const id = 13212345678;

        callback({id, fecha: new Date().getTime(),})

        socket.broadcast.emit('enviar-mensaje', payload)
    })

}

module.exports = {
    socketContoller
}