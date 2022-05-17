const  validateRoles = require('../middlewares/validate-roles');
const  validFields  = require('../middlewares/valid-fields');
const  validateJWT  = require('../middlewares/validate-jwt');

module.exports = {
    ...validateRoles,
    ...validFields,
    ...validateJWT
};