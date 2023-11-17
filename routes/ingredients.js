const express = require('express');
const router = express.Router();

const getIngredientsList = require('../controllers/ingredients/getIngredientsList');
const getRecipesByIngredients = require('../controllers/ingredients/getRecipesByIngredients');

router.get('/list', getIngredientsList);
router.get('/', getRecipesByIngredients);

module.exports = router;