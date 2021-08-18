const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrearTicket = document.querySelector('#btnCrearTicket')


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnCrearTicket.disabled = false;

});
socket.on( 'ultimo-ticket', ( ultimo ) => {
    lblNuevoTicket.innerText = 'Ticket '+ultimo
});
socket.on('disconnect', () => {
    btnCrearTicket.disabled = true;

});

btnCrearTicket.addEventListener( 'click', () => {

    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket
    });
    
});


