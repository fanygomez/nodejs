const { response } = require('express');

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


const create = (req, res = response) => {
    res.status(201).send(
        {
            status:  true,
            data: { name: "Fany", lastaname:"Gomez"},
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