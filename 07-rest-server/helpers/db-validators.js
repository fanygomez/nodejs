const Role = require('../models/role');
const { User, Category, Product } = require('../models');

const isValidRole = async (role = '')=>{
    const isRole = await Role.findOne({ role: role });
    if ( !isRole ) {
        throw new Error(`Invalid role`);
    }
}

const existEmail = async ( email = '') => {
    const existEmail = await User.findOne({ email: email });
    console.log("existEmail",existEmail);
    if ( existEmail) {
        throw new Error("This email exist");
    }
}

const existUserById = async( id ) => {

    const existUser = await User.findById(id);
    if ( !existUser ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existCategory = async ( category = '') => {
    const existCategory = await Category.findOne({ name: category, status: true });
    console.log("existCategory",existCategory);
    if ( existCategory) {
        throw new Error("This Category exist");
    }
}

const existCategoryById = async( id ) => {

    const existCategory = await Category.findById(id);
    if ( !existCategory ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const existProductById = async (id) => {
    const existProduct = await Product.findById(id);
    if (!existProduct) {
      throw new Error(`El id no existe ${id}`);
    }
  };

const collectionsAllowed = async (collection = '', collections = []) => {
    const include = collections.includes(collection);
    if (!include) {
        throw new Error(`La collection no es permitida ${collection}`);
    }
    return true;
}

module.exports = { isValidRole, existEmail, existUserById, existCategory, existCategoryById, existProductById, collectionsAllowed}