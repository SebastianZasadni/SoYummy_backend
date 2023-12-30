const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

const auth = require('../middleware/auth');

const getCategoriesList = require('../controllers/recipes/getCategoriesList');
const getRecipesByCategory = require('../controllers/recipes/getRecipesByCategory');
const getRecipeById = require('../controllers/recipes/getRecipeById');
const getRecipesMainPage = require('../controllers/recipes/getRecipesMainPage');
const getRecipesByQuery = require('../controllers/recipes/getRecipesByQuery');
const addRecipe = require('../controllers/recipes/addRecipe');
const deleteRecipe = require('../controllers/recipes/deleteRecipe');
const getOwnRecipes = require('../controllers/recipes/getOwnRecipes');
const addToFavorite = require('../controllers/recipes/addToFavorite');
const getFavoritesRecipes = require('../controllers/recipes/getFavoritesRecipes');
const deleteFavoriteRecipe = require('../controllers/recipes/deleteFavoriteRecipe');
const getPopularRecipes = require('../controllers/recipes/getPopularRecipes');
const uploadImage = require('../controllers/recipes/uploadImage');

router.get('/recipes/main-page/:limit', getRecipesMainPage);
router.get('/recipes/category-list', getCategoriesList);
router.get('/recipes/:category', getRecipesByCategory)
router.get('/recipes/id/:id', getRecipeById);
router.get('/search', getRecipesByQuery);
router.post('/own-recipes', auth, addRecipe);
router.delete('/own-recipes/:id', auth, deleteRecipe);
router.get('/own-recipes', auth, getOwnRecipes);
router.get('/favorite', auth, getFavoritesRecipes);
router.post('/favorite/:id', auth, addToFavorite);
router.delete('/favorite/:id', auth, deleteFavoriteRecipe);
router.get('/popular-recipes', getPopularRecipes);
router.post('/upload', upload.single('image'), uploadImage);


module.exports = router;