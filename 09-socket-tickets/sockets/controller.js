const { TicketControl } = require('../models')

const ticketControl = new TicketControl()

const socketContoller = (socket) => { 

    socket.emit('ultimo-ticket',ticketControl.ultimo)
    socket.emit('estado-actual',ticketControl.ultimos4)
    socket.emit('tickets-pentientes',ticketControl.tickets.length)
    socket.on('siguiente-ticket', ( payload, callback ) =>{
        const siguiente = ticketControl.siguiente()
        callback(siguiente)

        // Notificar que hay un nuevo ticket pendiente de asignar 
        socket.broadcast.emit( 'tickets-pentientes', ticketControl.tickets.length);
    })
    socket.on('atender-ticket', ({ escritorio }, callback) => {
        
        if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'Es escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4 );
        socket.emit( 'tickets-pentientes', ticketControl.tickets.length);
        socket.broadcast.emit( 'tickets-pentientes', ticketControl.tickets.length);

        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }

    })
    socket.on('estado-actual',(payload, callback) => {
        console.log(payload)
    })

    socket.on('disconnect', () =>{})
}

module.exports = {
    socketContoller
}