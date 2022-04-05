const getUsuarioById = (id, callback) =>{
    const usuario = {
        id,
        nombre: 'Stefhania'
    }
    setTimeout(() => {
        // console.log(usuario);
        callback(usuario)
    },1500);
}

// getUsuarioById(10);
getUsuarioById(10, (usuario) => {
    console.log('Hola mundo...');
    console.log(usuario);
});