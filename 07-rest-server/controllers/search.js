const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require('../models/index');

const collections = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUser = async( term = '', res = response) => {
    const isValid = ObjectId.isValid( term);
    console.log("isValid",isValid);
    if( isValid){
        const user = await User.findById({ _id: term }).lean();
        return res.json({ 
            results: (user) ? [ user ]: []
        });
    }
    const regex = new RegExp( term , 'i');
    const user = await User.find({
        $or: [ {  name: regex }, { email: regex}],
        $and: [ { status: true }]
     }).lean();
    return res.json({ 
        results: (user) ? user : []
    });
}

const searchCategory = async( term = '', res = response) => {
    const isValid = ObjectId.isValid( term);
    if( isValid){
        const category = await Category.findById({ _id: term }).lean();
        return res.json({ 
            results: (category) ? [ category ]: []
        });
    }
    const regex = new RegExp( term , 'i');
    const categories = await Category.find({ name: regex, status: true }).lean();
    return res.json({ 
        results: (categories) ? categories : []
    });
}

const searchProduct = async( term = '', res = response) => {
    const isValid = ObjectId.isValid( term);
    if( isValid){
        const product = await Product.findById({ _id: term })
        .populate("user", "name")
        .populate("category", "name").lean();
        return res.json({ 
            results: (product) ? [ product ]: []
        });
    }
    const regex = new RegExp( term , 'i');
    const products = await Product.find({
        $or: [ {  name: regex }],
        $and: [ { status: true }]
     })
     .populate("user", "name")
     .populate("category", "name")
     .lean();
    return res.json({ 
        results: (products) ? products : []
    });
}
const search = (req, res = response) =>{
    const { collection , term } = req.params;
    
    if( !collections.includes( collection)){
        return res.status(400).json({
            message: `Las coleciones permitidas son: ${collections }`,
        })
    }

    switch (collection) {
        case 'users':
            searchUser(term, res);
            break;
        case 'products':
            searchProduct(term, res);
            break;
        case 'categories':
            searchCategory(term, res);
            break;
        default:
            res.status(400).json({
                msg: 'Error al procesar la solicitud'
            });
    }
}

module.exports = {
    search
}