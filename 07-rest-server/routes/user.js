const { Router } = require('express');
const { getAll ,create , update, remove  } = require('../controllers/userController');

const route = Router();


route.get('/', getAll);
route.post('/', create);
route.put('/', update);
route.delete('/', remove);

 module.exports = route;