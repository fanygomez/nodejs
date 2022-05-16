const { Router } = require('express');
const { check } = require('express-validator');


const { getAll, getById, create , update, remove  } = require('../controllers/userController');
//validators
const { isValidRole, existEmail, existUserById } = require('../helpers/db-validators');
const { validFields } = require('../middlewares/valid-fields');

const route = Router();


route.get('/', getAll);
route.get('/:id', getById);
route.post('/',
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( existEmail ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( isValidRole ), 
    validFields
],
    create);
route.put('/:id', [
    check('id',"No es ID valido").isMongoId(),
    check('id').custom( existUserById),
    check('role').custom( isValidRole ),
    validFields
], update);
route.delete('/:id',[
    check('id',"No es ID valido").isMongoId(),
    check('id').custom( existUserById),
    validFields
], remove);

 module.exports = route;