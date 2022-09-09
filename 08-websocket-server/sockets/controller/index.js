const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado...');
    })

    socket.on('enviar-mensaje',(payload, callback) => {//recibir mensaje del cliente
        const id = 123456;
        // callback({id, date: new Date().getTime()})
        console.log("Mensaje recibo: ", payload)
        socket.broadcast.emit('enviar-mensaje', payload);//enviar mensaje al server
    })
}

module.exports = {
    socketController
}