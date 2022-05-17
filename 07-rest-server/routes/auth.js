const { Router } = require('express');
const { check } = require('express-validator');


const { login, googleSingIn } = require('../controllers/auth');
const { validFields } = require('../middlewares/valid-fields');


const route = Router();


route.get('/login',[
    check("email", "El correo es obligatorio").isEmail(),
    validFields
], login);

route.post('/google',[
    check("id_token", "El id_token es necesario").not().isEmpty(),
    validFields
], googleSingIn);
module.exports = route;