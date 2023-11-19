const express = require('express');
const router = express.Router();

const getCategoriesList = require('../controllers/recipes/getCategoriesList');
const getRecipesByCategory = require('../controllers/recipes/getRecipesByCategory');
const getRecipeById = require('../controllers/recipes/getRecipeById');
const getRecipesMainPage = require('../controllers/recipes/getRecipesMainPage');
const getRecipesByQuery = require('../controllers/recipes/getRecipesByQuery');
const addRecipe = require('../controllers/recipes/addRecipe');
const deleteRecipe = require('../controllers/recipes/deleteRecipe');

router.get('/recipes/main-page', getRecipesMainPage);
router.get('/recipes/category-list', getCategoriesList);
router.get('/recipes/:category', getRecipesByCategory)
router.get('/recipes/id/:id', getRecipeById);
router.get('/search', getRecipesByQuery);
router.post('/own-recipes', addRecipe);
router.delete('/own-recipes/:id', deleteRecipe);

module.exports = router;