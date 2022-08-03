const  validateRoles = require('../middlewares/validate-roles');
const  validFields  = require('../middlewares/valid-fields');
const  validateJWT  = require('../middlewares/validate-jwt');
const validateFileUpload = require('./validate-load-file');

module.exports = {
    ...validateRoles,
    ...validFields,
    ...validateJWT,
    ...validateFileUpload
};