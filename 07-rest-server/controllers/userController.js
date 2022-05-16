const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
//models

const User = require('../models/User');


const getAll = async ( req = request, res = response) => {
    const { limit = 5, from = 0} = req.query;
    // const users = await User.find({ status: true})
    //     .skip(Number(from))
    //     .limit(Number(limit));

    // const total = await User.countDocuments();

    const [ total, users ] = await Promise.all([
        User.countDocuments(),
        User.find({ status: true})
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).send({ total, users });
};

const getById = ( req = request, res = response) => {
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
    
    //encrypt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();

    res.status(201).json(
        {
            data: { user },
            message: "created"
        }
    )
};

const update = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google,email, ...user} = req.body;
    //validate if exist
    if(password){
        //encrypt
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    }
    const findUser = await User.findByIdAndUpdate( id, user);
    res.status(200).json(findUser);
};

const remove = async (req = request, res = response) => {
    const { id }= req.params;

    // const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, { status: false });
    res.status(200).send(user);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};