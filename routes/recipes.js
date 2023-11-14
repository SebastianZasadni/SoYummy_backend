const express = require('express');
const router = express.Router();

const getAll = require('../controllers/recipes/getAll');
const getCategoriesList = require('../controllers/recipes/getCategoriesList');

router.get('/', getAll);
router.get('/category-list', getCategoriesList);

module.exports = router;