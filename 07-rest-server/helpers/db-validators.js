const Role = require('../models/role');

const isValidRole = async (role = '')=>{
    const isRole = await Role.findOne({ role: role });
    if ( !isRole ) {
        throw new Error(`Invalid role`);
    }
}

const existEmail = async ( email = '') => {
    const existEmail = await User.findOne({ email: email });
    console.log("existEmail",existEmail);
    if ( existEmail) {
       throw new Error(`This email exist`);
    }
}

const existUserById = async( id ) => {

    // Verificar si el correo existe
    const existUser = await Usuario.findById(id);
    if ( !existUser ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = { isValidRole, existEmail, existUserById }