const { response } = require("express")

const uploadFiles = (request, res = response) =>{
    res.json({message: "uploadFiles"})
}

module.exports = {
    uploadFiles
}