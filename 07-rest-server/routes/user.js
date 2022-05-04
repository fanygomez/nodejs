const { Router } = require('express');
const { check } = require('express-validator');


const { getAll, getById, create , update, remove  } = require('../controllers/userController');
const { validFields } = require('../middlewares/valid-fields');

const route = Router();


route.get('/', getAll);
route.get('/:id', getById);
route.post('/',
    [ 
        check('name',"Name: Empty field.").not().isEmpty(),
        check('password',"password: Empty field.").isLength({ min: 6}).not().isEmpty(),
        check('email',"Invalid Email.").isEmail(),
        check('rol','Rol: Invalid Role').isIn("ADMIN_ROLE","USER_ROLE"),
        validFields // custom middleware
    ],
    create);
route.put('/:id', update);
route.delete('/:id', remove);

 module.exports = route;