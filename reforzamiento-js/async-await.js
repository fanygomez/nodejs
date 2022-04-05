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

const getEmpleado = ( id) => {
    
    return new Promise( (resolve, reject) =>{
        const empleado = empleados.find( ( e) => e.id === id)?.nombre;

        (empleado)  
            ? resolve(empleado) 
            :
            reject(`No existe empleado con id ${id}`)
    
    });
}

const getSalario = ( id ) => {    
    return new Promise( (resolve, reject) =>{
        const salario = salarios.find( ( e) => e.id === id)?.salario;
        (salario)  
            ? resolve(salario) 
            :
            reject(`El empleado con id ${id} no tiene asignado salario`)
    
    });
}
const id = 3;

const getInfoUsuario = async(id) => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
    
        return `El salario del empleado: ${ empleado } es de ${salario}`;   
    } catch (error) {
        throw error;// reject de la funcion async
    }
}

// getInfoUsuario( id )
//     .then(msg => console.log(msg))
getInfoUsuario( id )
    .then(msg => {
        console.log("TODO BIEN!");
        console.log(msg)
    }).catch(err => {
        console.log("Too bad");
        console.log(err);
    });