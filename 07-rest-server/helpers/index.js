const dbValidator = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google.verify');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...uploadFile
}