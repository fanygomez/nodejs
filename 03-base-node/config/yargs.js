const { array, options } = require('yargs');

const argv = require('yargs')
.options('b',{
    alias:'base',
    type: 'number',
    //default: '5'
    demandOption: true,
    describe: 'base de la tabla a generar'
})
.check((argv, options) => {
    if ( isNaN(argv.base)) {
        throw 'La base tiene que ser un numero'
    }
    return true;
})
.options('l',{
    alias:'listar',
    type: 'boolean',
    default: false,
    describe: 'Bandera para mostrar el resultado de la tabla en consola'
})
.options('h',{
    alias:'hasta',
    type: 'number',
    default: 10,
    describe: 'N hasta el numero que desees genear la tabla'
})
.argv;

module.exports = argv;