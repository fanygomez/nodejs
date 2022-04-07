const fs = require('fs');

const colors = require('colors');

const crearArchivo = async ( base = 5, hasta=10 ,listar = false) => {

    try {

        
        console.log("============================".green);
        console.log("Tabla del:".bgBlue, colors.blue( base ));
        console.log("============================".green);
    
        let salida, consola = "";

        for (let index = 1; index <= hasta; index++) {
            salida +=`${ base  } x ${index} = ${base * index} \n`;
            consola +=`${ base } ${'x'.green } ${index}  ${'='.green }   ${base * index} \n`;
            
        }

        if(listar){
            console.log(consola);
        }
    
        fs.writeFileSync(`./out/tabla-${base}.txt`,salida); // si existe algun error debe estar dentro de un try-catch
        return `tabla-${base} creado...`;


    } catch (error) {
        throw error;
    }
}

module.exports = { 
    crearArchivo
}
