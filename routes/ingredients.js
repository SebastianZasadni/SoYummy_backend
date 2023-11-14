const express = require('express');
const router = express.Router();

const getIngredientsList = require('../controllers/ingredients/getIngredientsList');

router.get('/list', getIngredientsList);

module.exports = router;