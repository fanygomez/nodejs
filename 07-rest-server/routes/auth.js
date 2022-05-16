const { Router } = require('express');
const { check } = require('express-validator');


const { login } = require('../controllers/auth');
const { validFields } = require('../middlewares/valid-fields');


const route = Router();


route.get('/login',[
    check("email", "El correo es obligatorio").isEmail(),
    validFields
], login);

module.exports = route;