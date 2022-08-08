const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { uploadFile: upload } = require("../helpers");
const { User, Product } = require("../models");
const uploadFile = async (request, res = response) => {
    try {
        // const pathFile = await upload(request.files,'text',['txt','md']);
        const pathFile = await upload(request.files,'imgs');
        return res.status(200).json({ message: "Archivo cargado a" + pathFile });
    } catch (error) {
        console.log("err", error);
        return res
            .status(400)
            .json({ message: "Ocurrio un error al procesar la solicitud", error });
    }
};

const updateFile = async (request, res = response) => {
    try {
        const { id, collection } = request.params;
        let model;

        switch (collection) {
            case "users":
                model = await User.findById(id);
                if (!model) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el id ${id}`,
                    });
                }

                break;

            case "products":
                model = await Product.findById(id);
                if (!model) {
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${id}`,
                    });
                }

                break;

            default:
                return res.status(500).json({ msg: "Se me olvidó validar esto" });
        }
        // Limpiar imágenes previas
        if (model.img) {
            // Hay que borrar la imagen del servidor
            // const pathImagen = path.join(
            //     __dirname,
            //     "../uploads",
            //     collection,
            //     model.img
            // );
            console.log("pathImagen",model.img);
            if (fs.existsSync(model.img)) {
                fs.unlinkSync(model.img);
            }
        }

        const name = await upload(request.files,collection);
        model.img = name;

        await model.save();
        res.json(model);
    } catch (error) {
        console.log("err", error);
        return res
            .status(400)
            .json({ message: "Ocurrio un error al procesar la solicitud", error });
    }
};

const getFile = async (request, res = response) => {
    const { id, collection } = request.params;
        let model;
        switch (collection) {
            case "users":
                model = await User.findById(id);
                if (!model) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el id ${id}`,
                    });
                }

                break;

            case "products":
                model = await Product.findById(id);
                if (!model) {
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${id}`,
                    });
                }

                break;

            default:
                return res.status(500).json({ msg: "Se me olvidó validar esto" });
        }
        if (model.img) {
            if (fs.existsSync(model.img)) {
               return res.sendFile(model.img)
            }
        }

        const pathImagen = path.join(__dirname,"../assets/images/no-image.jpg");
        return res.sendFile(pathImagen)
}
module.exports = {
    uploadFile,
    updateFile,
    getFile
};
