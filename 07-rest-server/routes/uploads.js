const { Router } = require('express');
const { check } = require('express-validator');


const { login, googleSingIn } = require('../controllers/auth');
const { uploadFiles } = require('../controllers/uploads');
const { validFields } = require('../middlewares/valid-fields');


const route = Router();


route.get('/login',[
    check("email", "El correo es obligatorio").isEmail(),
    validFields
], login);

route.post('/upload',[
    // check("id_token", "El id_token es necesario").not().isEmpty(),
    // validFields
], uploadFiles);
module.exports = route;