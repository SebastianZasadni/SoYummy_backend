const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/multer');

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
/**
 * @swagger
 * /api/recipes/main-page/{limit}:
 *   get:
 *     tags:
 *       - Recipe Controller
 *     summary: Get recipes for the main page
 *     parameters:
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: The limit of recipes to retrieve for each category
 *     responses:
 *       200:
 *         description: Successful response with recipes for the main page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Server Error
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the recipe
 *         title:
 *           type: string
 *           description: The title of the recipe
 *         category:
 *           type: string
 *           description: The category of the recipe
 *         area:
 *           type: string
 *           description: The area of the recipe
 *         instructions:
 *           type: string
 *           description: The instructions for the recipe
 *         description:
 *           type: string
 *           description: The description of the recipe
 *         thumb:
 *           type: string
 *           description: The thumbnail of the recipe
 *         preview:
 *           type: string
 *           description: The preview image of the recipe
 *         time:
 *           type: string
 *           description: The time required for the recipe
 *         favorites:
 *           type: array
 *           items:
 *             type: string
 *           default: []
 *           description: List of user favorites for the recipe
 *         youtube:
 *           type: string
 *           description: The YouTube link for the recipe
 *         ingredients:
 *           type: array
 *           description: List of ingredients for the recipe
 *         owner:
 *           type: string
 *           description: The owner of the recipe
 */

router.get('/recipes/category-list', getCategoriesList);
/**
 * @swagger
 * /api/recipes/category-list:
 *   get:
 *     tags:
 *       - Category Controller
 *     summary: Get list of categories
 *     responses:
 *       200:
 *         description: Successful response with the list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 categoriesList:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of categories sorted alphabetically
 *       500:
 *         description: Server Error
 */

router.get('/recipes/:category', getRecipesByCategory)
/**
 * @swagger
 * /api/recipes/{category}:
 *   get:
 *     tags:
 *       - Recipe Controller
 *     summary: Get recipes by category
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: The category to filter recipes by
 *         schema:
 *           type: string
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number for pagination (default is 1)
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Successful response with the list of recipes for the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 recipes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recipe'
 *                   description: List of recipes for the specified category
 *       400:
 *         description: Bad Request - Recipes not found for the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (failed)
 *                 message:
 *                   type: string
 *                   description: Error message indicating that recipes are not found
 *       500:
 *         description: Server Error
 */

router.get('/recipes/id/:id', getRecipeById);
/**
 * @swagger
 * /api/recipes/id/{id}:
 *   get:
 *     tags:
 *       - Recipe Controller
 *     summary: Get recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recipe to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the recipe for the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 recipe:
 *                   $ref: '#/components/schemas/Recipe'
 *                   description: Recipe for the specified ID
 *       400:
 *         description: Bad Request - Recipe not found for the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (failed)
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the recipe is not found
 *       500:
 *         description: Server Error
 */

router.get('/search', getRecipesByQuery);
/**
 * @swagger
 * /api/search:
 *   get:
 *     tags:
 *       - Recipe Controller
 *     summary: Get recipes by query
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: The query string to search for recipes
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the list of recipes matching the query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 recipes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recipe'
 *                   description: List of recipes matching the query
 *       400:
 *         description: Bad Request - Recipes not found for the specified query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (failed)
 *                 message:
 *                   type: string
 *                   description: Error message indicating that recipes are not found for the specified query
 *       500:
 *         description: Server Error
 */

router.post('/own-recipes', auth, addRecipe);
/**
 * @swagger
 * /api/own-recipes:
 *   post:
 *     tags:
 *       - Recipe Controller
 *     summary: Add a new recipe
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewRecipe'
 *     responses:
 *       200:
 *         description: Successful response with the newly added recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 newRecipe:
 *                   $ref: '#/components/schemas/Recipe'
 *                   description: Newly added recipe
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the recipe was added successfully
 *       400:
 *         description: Bad Request - Validation error in request payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   description: Validation error details
 *       500:
 *         description: Server Error
 * components:
 *   schemas:
 *     NewRecipe:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the recipe
 *         about:
 *           type: string
 *           description: Information about the recipe
 *         category:
 *           type: string
 *           description: The category of the recipe
 *         thumb:
 *           type: string
 *           description: URL of the recipe thumbnail image
 *         time:
 *           type: string
 *           description: The time required to prepare the recipe
 *         preparation:
 *           type: string
 *           description: Instructions for preparing the recipe
 *         ingredientsList:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ingredient'
 *           description: List of ingredients for the recipe
 */


router.delete('/own-recipes/:id', auth, deleteRecipe);
/**
 * @swagger
 * /api/own-recipes/{id}:
 *   delete:
 *     tags:
 *       - Recipe Controller
 *     summary: Delete a recipe by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recipe to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the deleted recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the recipe was deleted
 *                 recipe:
 *                   $ref: '#/components/schemas/Recipe'
 *                   description: Deleted recipe
 *       400:
 *         description: Bad Request - Recipe not found for the specified ID or user is not the owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (failed)
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the recipe is not found or the user is not the owner
 *       500:
 *         description: Server Error
 */

router.get('/own-recipes', auth, getOwnRecipes);
/**
 * @swagger
 * /api/own-recipes:
 *   get:
 *     tags:
 *       - Recipe Controller
 *     summary: Get recipes owned by the current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the list of recipes owned by the current user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 recipes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recipe'
 *                   description: List of recipes owned by the current user
 *       400:
 *         description: Bad Request - No recipes found for the current user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (failed)
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the current user doesn't have any recipes
 *       500:
 *         description: Server Error
 */

router.get('/favorite', auth, getFavoritesRecipes);
/**
 * @swagger
 * /api/favorite:
 *   get:
 *     tags:
 *       - Recipe Controller
 *     summary: Get favorite recipes of the current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the list of favorite recipes of the current user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 recipes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recipe'
 *                   description: List of favorite recipes of the current user
 *       400:
 *         description: Bad Request - No favorite recipes found for the current user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (failed)
 *                 message:
 *                   type: string
 *                   description: Error message indicating that no favorite recipes found for the current user
 *       500:
 *         description: Server Error
 */

router.post('/favorite/:id', auth, addToFavorite);
/**
 * @swagger
 * /api/favorite/{id}:
 *   post:
 *     tags:
 *       - Recipe Controller
 *     summary: Add a recipe to favorites
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the recipe to be added to favorites
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response indicating that the recipe has been added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the recipe has been added to favorites
 *       400:
 *         description: Bad Request - Recipe not exist or already in favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (failed)
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the recipe not exist or already in favorites
 *       500:
 *         description: Server Error
 */

router.delete('/favorite/:id', auth, deleteFavoriteRecipe);
/**
 * @swagger
 * /api/favorite/{id}:
 *   delete:
 *     tags:
 *       - Recipe Controller
 *     summary: Remove a recipe from favorites
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the recipe to be removed from favorites
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response indicating that the recipe has been removed from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the recipe has been removed from favorites
 *       400:
 *         description: Bad Request - Recipe not exist or not in favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (failed)
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the recipe does not exist or is not in favorites
 *       500:
 *         description: Server Error
 */

router.get('/popular-recipes', getPopularRecipes);
/**
 * @swagger
 * /api/popular-recipes:
 *   get:
 *     tags:
 *       - Recipe Controller
 *     summary: Get popular recipes based on the number of favorites
 *     responses:
 *       200:
 *         description: Successful response with the list of popular recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 countOfPopularRecipes:
 *                   type: integer
 *                   description: The count of popular recipes
 *                 popularRecipes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recipe'
 *                   description: List of popular recipes
 *       500:
 *         description: Server Error
 */

router.post('/upload', upload.single('image'), uploadImage);
/**
 * @swagger
 * /api/upload:
 *   post:
 *     tags:
 *       - Upload Controller
 *     summary: Upload an image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful response with the URL of the uploaded image
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: URL of the uploaded image
 *       500:
 *         description: Server Error
 */

module.exports = router;