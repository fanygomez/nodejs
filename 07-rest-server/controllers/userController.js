const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
//models

const User = require('../models/User');


const getAll = ( req, res = response) => {
    res.status(200).send(
        {
            status:  true,
            data: { name: "Fany", lastaname:"Gomez"},
            message: "success"
        }
    )
};

const getById = ( req, res = response) => {
    const { id } = req.params;
    res.status(200).send(
        {
            status:  true,
            data: { name: "Fany", lastaname:"Gomez"},
            message: "success"
        }
    )
};


const create = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    
    //if exist email
    const existEmail = await User.findOne({ email });
    if ( existEmail) {
        return res.status(400).json({
            msg:'This email exist'
        });
    }

    //verficar contrasenia

    //encrypt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();

    res.status(201).send(
        {
            data: { user },
            message: "create"
        }
    )
};

const update = (req, res = response) => {
    const { id } = req.params;
    res.status(200).send(
        {
            status:  true,
            data: { name: "Fany", lastaname:"Gomez"},
            message: "update"
        }
    )
};

const remove =  (req, res = response) => {
    res.status(200).send(
        {
            status:  true,
            data: { name: "Fany", lastaname:"Gomez"},
            message: "remove"
        }
    )
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};