const { Router } = require('express');
const { check } = require('express-validator');


const { getAll, getById, create , update, remove  } = require('../controllers/product');
const { existProductById } = require('../helpers/db-validators');
//validators
const { validFields, roleBasedUserAuth, validateJWT } = require("../middlewares")

const route = Router();


route.get('/', getAll);
route.get('/:id', [
    check('id',"No es ID valido").isMongoId(),
    check('id').custom( existProductById),
    validFields
], getById);
route.post('/',
[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'Id de categoria no valido').isMongoId(),
    validFields
],
    create);
route.put('/:id', [
    validateJWT,
    check('category', 'Id de categoria no valido').isMongoId(),
    check('id').custom( existProductById ),
    validFields
], update);
route.delete('/:id',[
    validateJWT,
    roleBasedUserAuth('ADMIN_ROLE'),
    check('id').custom( existProductById ),
    validFields
], remove);

 module.exports = route; 