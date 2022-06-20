const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
//models
const Category = require('../models/Category');


const getAll = async ( req = request, res = response) => {
    const { limit = 5, from = 0} = req.query;

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(),
        Category.find({ status: true})
            .populate('user','name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).send({ total, categories });
};

const getById = async ( req = request, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user','name');
    res.status(200).send(
        {
            category
        }
    )
};


const create = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name}).lean();    
    if(categoryDB){
        return res.status(400).json({
            msg: 'La categorya ya existe'
        });
    }
   const data = {
    name,
    user: req.user.uid
   };

   const category = new Category( data);
   await category.save();
    res.status(201).json(
        {
            category
        }
    )
};

const update = async (req = request, res = response) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user.uid;

    const findCategory = await Category.findByIdAndUpdate( id, data, { new: true});
    res.status(200).json(findCategory);
};

const remove = async (req = request, res = response) => {
    const { id }= req.params;
    const category = await Category.findByIdAndUpdate(id, { status: false },{ new: true});
    
    res.status(200).send({ category });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};