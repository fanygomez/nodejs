const empleados = [
    {
        id: 1,
        nombre: 'stefhani',
    },
    {
        id: 2,
        nombre: 'cris',
    },
    {
        id: 3,
        nombre: 'Ale',
    }
];

const salarios = [
    {
        id: 1,
        salario : 1000
    },
    {
        id:2,
        salario: 1500
    }
];

const getEmpleado = ( id , callback) => {
    const empleado = empleados.find( ( e) => e.id === id);
    
    return new Promise( (resolve, reject) =>{
        (empleado)  
            ? resolve(empleado) 
            :
            reject(`No existe empleado con id ${id}`)
    
    });
}

const getSalario = ( id , callback) => {
    const salario = salarios.find( ( e) => e.id === id);
    
    return new Promise( (resolve, reject) =>{
        (salario)  
            ? resolve(salario) 
            :
            reject(`El empleado con id ${id} no tiene asignado salario`)
    
    });
}
const id = 1;
    getEmpleado(id)
        .then( empleado => console.log(empleado))
        .catch( err => console.log(err));

    getSalario(id)
    .then( salario => console.log(salario))
    .catch( err => console.log(err));

//promesas anidadas, promesas en cadena
let nombre;
console.log("Promesas en cadena");
    
getEmpleado(3)
        .then(empleado => {
            nombre = empleado;
            return getSalario(id);
        })
        .then(salario => console.log('el empleado:',nombre,'tiene salario:',salario))
        .catch( err => console.log(err));
