const { request, response } = require("express");
//models
const Product = require("../models/Product");
const { body } = require("express-validator");

const getAll = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, products] = await Promise.all([
    Product.countDocuments(),
    Product.find({ status: true })
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.status(200).send({ total, products });
};

const getById = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.find({id, status: true})
    .populate("user", "name")
    .populate("category", "name");
  res.status(200).send({
    product,
  });
};

const create = async (req = request, res = response) => {
  const { status, user, ...body } = req.body;
  let { name } = req.body;
  name = name.toUpperCase();
  const data = {
    name: name,
    user: req.user.uid,
    price: body.price,
    category: body.category,
    description: body.description,
  };

  const productDB = await Product.findOne({ name }).lean();
  if (productDB) {
    return res.status(400).json({
      msg: "El producto ya existe",
    });
  }

  const product = new Product(data);
  await product.save();
  res.status(201).json({
    product,
  });
};

const update = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, price, category, description } = req.body;
  const data = {
    name,
    price,
    category,
    description,
  };
  data.name = data.name.toUpperCase();
  data.user = req.user.uid;

  const findProduct = await Product.findByIdAndUpdate(id, data, {
    new: true,
  });
  res.status(200).json(findProduct);
};

const remove = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.status(200).send({ product });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};