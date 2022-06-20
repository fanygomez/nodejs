const { Router } = require('express');
const { check } = require('express-validator');


const { getAll, getById, create , update, remove  } = require('../controllers/category');
const { existCategory, existCategoryById } = require('../helpers/db-validators');
//validators
const { validFields,roleBasedUserAuth,validateJWT,isAdminRole } = require("../middlewares")

const route = Router();


route.get('/', getAll);
route.get('/:id', [
    check('id',"No es ID valido").isMongoId(),
    check('id').custom( existCategoryById),
    validFields
], getById);
route.post('/',
[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validFields
],
    create);
route.put('/:id', [
    validateJWT,
    check('name', 'El campo nombre es obligatorio').not().isEmpty(),
    check('id',"No es ID valido").isMongoId(),
    validFields
], update);
route.delete('/:id',[
    validateJWT,
    roleBasedUserAuth('ADMIN_ROLE'),
    check('id',"No es ID valido").isMongoId(),
    validFields
], remove);

 module.exports = route;