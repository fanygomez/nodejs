const bcryptjs = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
const { generateJWT } = require('../helpers/generar-jwt');
const User = require('../models/User');


const login = async ( req, res = response ) =>{

    const { email , password} = req.body;
    try {
        //verificar si el emial existe

        const user = await User.findOne({ email});
        if( !user){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            });
        }
        if( !user.status ){
            return res.status(400).json({
                msg: 'Usuario no esta activo'
            });  
        }

        const validPassword = bcryptjs.compareSync( password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            }); 
        }
        console.log("genera ", user);
        //Generar Token
        const token = await generateJWT( user._id);
        res.status(200).json({
            user,
            token
        });
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            msg: "Ha ocurrido un error al procesar la solicitud."
        })
    }
}

module.exports = {
    login
}