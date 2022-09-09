//referencias del HTML
const lblOnline  = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje =  document.querySelector("#txtMensaje");
const btnEnviar  =  document.querySelector("#btnEnviar");
const socket = io();
socket.on("connect", () => {
    console.log('Conectado...');
    console.log("hola mundo");
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})

socket.on("disconnect", () => {
    console.log('Desconectado...');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
})

btnEnviar.addEventListener('click', () =>{
    const message = txtMensaje.value;
    console.log("Mensaje enviado: ",message);
    socket.emit("enviar-mensaje", message);
})

socket.on("enviar-mensaje", (id) => {
    console.log('recibiendo mensaje de el server... => ', id);
})