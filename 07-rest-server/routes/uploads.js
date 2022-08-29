const { Router } = require('express');
const { check } = require('express-validator');

const { updateFileCloudinary, uploadFile, getFile } = require('../controllers/uploads');
const { collectionsAllowed } = require('../helpers');
const { validFields, validateFileUpload } = require('../middlewares');


const route = Router();


route.post('/', validateFileUpload, uploadFile);

route.put('/:collection/:id',[
    validateFileUpload,
    check('id','El id debe ser valido').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users','products'])),
    validFields
], updateFileCloudinary);

route.get('/:collection/:id',[
    check('id','El id debe ser valido').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users','products'])),
    validFields
], getFile)

module.exports = route;