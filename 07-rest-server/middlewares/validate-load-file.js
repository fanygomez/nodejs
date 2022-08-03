const { response } = require("express")


const validateFileUpload = (req, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        return res.status(400).json({
            message: 'No hay archivos que subir - validarArchivoSubir'
        });
    }

    next();

}


module.exports = {
    validateFileUpload
}
