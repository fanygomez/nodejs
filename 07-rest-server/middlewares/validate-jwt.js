const { request } = require('express');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validateJWT = async (req = request, res = response, next ) =>{

  const token = req.header('x-token');
  if(!token){
      return res.status(401).json({
           msg: 'No hay token en la petición'
      })
  }
  try {
      const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

      const user = await User.findById(uid);
    if( !user){
      return res.status(401).json({
        msg: 'Token no valido - Usuario inactivo'
      });
    }
      if( !user.status){
        return res.status(401).json({
          msg: 'Token no valido - Usuario inactivo'
        })
      }
      req.authenticatedUser = user;
      next();
      
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        msg: 'Token no valido'
    });
  }
};

module.exports = { 
    validateJWT 
}