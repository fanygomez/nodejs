const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, folder = '', validExtensions = ['png','jpg','jpeg','gif']) => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const fileName = file.name.split('.');
        const extension = fileName[fileName.length -1]
        //Validate extensions.
        if (!validExtensions.includes( extension )) {
            return reject(`La extension [ ${extension} ] no es valida. Archivos permitidos ${validExtensions}`);
        }
        const nameTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/',folder, nameTemp);
    
        file.mv(uploadPath, (err) => {
            if (err) {
                console.log("err",err);
                return reject("Ha ocurrido un erro al procesar la solicitud."+ err);
            }
            resolve(uploadPath)
    
        })
    })
}

module.exports = { 
    uploadFile
 }