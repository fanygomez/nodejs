const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre: function(){
        return `${ this.nombre } ${ this.apellidos }`;
    }
}
//desestructuracion

//const {nombre, apellido, poder,edad = 50} = deadpool;
//console.log(nombre, apellido, poder,edad);

function imprimeHeroe(heroe) {
    
    const {nombre, apellido, poder,edad = 50} = heroe;
    console.log(nombre, apellido, poder,edad);

}

function imprimeHeroeDesestruraciondeObj({nombre, apellido, poder,edad = 50}) {
    
    console.log(nombre, apellido, poder,edad);

}
imprimeHeroeDesestruraciondeObj(deadpool);

const heroes = [ 'Deadpool', 'Superman', 'Batman'];
//desestrutrar un arreglo

// const [h1, h2,h3] = heroes;
// console.log(h1, h2, h3);

const [, , h3] = heroes;
console.log(h3);