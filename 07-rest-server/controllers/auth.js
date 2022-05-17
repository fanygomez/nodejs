const bcryptjs = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
const { json } = require('express/lib/response');
const { generateJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google.verify');
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

const googleSingIn = async (req, res = response) =>{
    const { id_token } = req.body;

    try {
        const {name, email,picture } =  await googleVerify(id_token);
        let user = await User.findOne({ email}).lean();
        if(!user){
            const data ={
                name,
                email,
                password:':P',
                img: picture,
                google: true              
            }

            const user = new User(data);
            await user.save();
        }
        
        if(!user.status){
            return res.status(401).json({
                msg: 'El usuario esta bloqueado'
            });
        }
        //Generar Token
        const token = await generateJWT( user._id);
        res.status(200).json({
            user,
            token
        });

    } catch (error) {
        console.log("err",error);
        res.status(400).json({
            msg: 'El token no se pudo verificar'
        })
    }
}
module.exports = {
    login,
    googleSingIn
}