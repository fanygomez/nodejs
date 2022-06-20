const { response } = require("express");


const isAdminRole = ( req, res = response, next)=>{
    if(!req.user){
        res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    const role  = req.user;
    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: "No tienes permisos para realizar esta solicitud"
        });
    }
    next();
}

const roleBasedUserAuth = ( ...roles)=>{
    return ( req, res = response, next ) => {
        if(!req.user){
            res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
        if( !roles.includes( req.user.role)){
            return res.status(401).json({
                msg: "No tienes permisos para realizar esta solicitud"
            });
        }
        next();
    };
}

module.exports = { 
    isAdminRole,
    roleBasedUserAuth
}