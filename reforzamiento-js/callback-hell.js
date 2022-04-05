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

const getEmpleado = ( id ) => {
    const empleado = empleados.find( ( e) => e.id === id);
    
    if( empleado){
        return empleado;
    }else{
        return `Empleado con id ${id} no exite`
    }
    return empleado;
}

console.log( getEmpleado(5) );

//2
const getEmpleado2 = ( id , callback) => {
    const empleado = empleados.find( ( e) => e.id === id);
    
    if( empleado){
        callback(empleado);
    }else{
        callback(`Empleado con id ${id} no exite`)
    }
}

console.log( getEmpleado2(2, (err, empleado) =>{

    if( err ){
        console.log('ERROR!')
        return console.log(err);
    }
    console.log('Empleado existe!!');
    console.log(empleado);
    
}));
console.log("#getSalario()")
const getSalario = (id,callback) =>{ 
    const salario = salarios.find((s) => s.id === id) ?.salario;

        if( salario){
            callback(null, salario)
        }else{
            callback(`El empleado no tiene salario asignado`)
        }
    
}
//
getEmpleado2(3, (err, empleado) =>{

    if( err ){
        console.log('ERROR!')
        return console.log(err);
    }    
     getSalario(3, (err, salario) =>{

        if( err ){
            console.log('ERROR!')
            return console.log(err);
        }
       
        console.log('el empleado:',empleado,'tiene salario:',salario);
    });
});