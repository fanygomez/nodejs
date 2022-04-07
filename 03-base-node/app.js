 const { log } = require('console');
const fs = require('fs');
const { argv2 } = require('process') ;
const { crearArchivo} = require('./helpers/multiplicar')

const argv  = require('./config/yargs');


 console.clear();
 
 //const base = 5;
//  let salida = "";
//  for (let index = 1; index <= 10; index++) {
//      salida +=`${ base  } x ${index} = ${base * index} \n`;
     
//  }
  
//  fs.writeFile(`tabla-${base}.txt`,salida, (err) =>{
//     if (err) throw err

//     console.log(`tabla-${base} creado...`);
//  });

// crearArchivo(base)
//     .then( nombreArchivo =>  console.log(nombreArchivo, 'creado'))
//     .catch(err => console.log(err));

// const [ , , arg3 = 'base=5'] = [process.argv];
// const [ , base=5 ] = arg3.split('=');
console.log('base: yargs', argv.base);
crearArchivo(argv.base, argv.hasta, argv.listar)
    .then( nombreArchivo =>  console.log(nombreArchivo, 'creado'))
    .catch(err => console.log(err));