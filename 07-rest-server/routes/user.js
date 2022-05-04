const { Router } = require('express');
const { getAll, getById, create , update, remove  } = require('../controllers/userController');

const route = Router();


route.get('/', getAll);
route.get('/:id', getById;
route.post('/', create);
route.put('/:id', update);
route.delete('/:id', remove);

 module.exports = route;