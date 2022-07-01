const { Router } = require('express');

const { search } = require('../controllers/search');

const route = Router();

route.get('/:collection/:term', search);

 module.exports = route;