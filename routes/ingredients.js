const express = require('express');
const router = express.Router();

const getIngredientsList = require('../controllers/ingredients/getIngredientsList');
const getRecipesByIngredients = require('../controllers/ingredients/getRecipesByIngredients');
const addIngredientToShoppingList = require('../controllers/ingredients/addIngredientToShoppingList');
const auth = require('../middleware/auth');
const getIngredientsFromShoppingList = require('../controllers/ingredients/getIngredientsFromShoppingList');
const deleteIngredientFromShoppingList = require('../controllers/ingredients/deleteIngredientFromShoppingList');

router.get('/list', getIngredientsList);
/**
 * @swagger
 * /api/ingredients/list:
 *   get:
 *     tags:
 *       - Ingredient Controller
 *     summary: Get list of ingredients
 *     responses:
 *       200:
 *         description: Successful response with the list of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 ingredientsList:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Server Error
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the ingredient
 *         ttl:
 *           type: string
 *           description: The name for the ingredient
 *         desc:
 *           type: string
 *           description: The description for the ingredient
 *         thb:
 *           type: string
 *           description: The thumbnail for the ingredient
 */

router.get('/', getRecipesByIngredients);
/**
 * @swagger
 * /api/ingredients/:
 *   get:
 *     tags:
 *       - Recipe Controller
 *     summary: Get recipes by ingredients
 *     parameters:
 *       - in: query
 *         name: ingredient
 *         required: true
 *         schema:
 *           type: string
 *         description: Ingredient name
 *     responses:
 *       200:
 *         description: Successful response with recipes filtered by ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recipe'
 *                 count:
 *                   type: integer
 *                   description: Number of recipes found
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

router.get('/shopping-list/', auth, getIngredientsFromShoppingList);
/**
 * @swagger
 * /api/shopping-list/:
 *   get:
 *     tags:
 *       - Shopping List
 *     summary: Get ingredients from the user's shopping list
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the user's shopping list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of ingredients from the shopping list
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: Error message here
 */

router.get('/shopping-list/:id', auth, addIngredientToShoppingList);
/**
 * @swagger
 * /api/shopping-list/add/{id}:
 *   get:
 *     tags:
 *       - Shopping List
 *     summary: Add an ingredient to the user's shopping list
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the ingredient to add
 *     responses:
 *       200:
 *         description: Successful response with updated shopping list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 response:
 *                   $ref: '#/components/schemas/User'  # Reference to the User schema, update as needed
 *                 message:
 *                   type: string
 *                   example: Ingredient added successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the user
 *         shoppingList:
 *           type: array
 *           items:
 *             type: string
 *           description: List of ingredients in the shopping list
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: Error message here
 */

router.delete('/shopping-list/:id', auth, deleteIngredientFromShoppingList);
/**
 * @swagger
 * /api/shopping-list/delete/{id}:
 *   delete:
 *     tags:
 *       - Shopping List
 *     summary: Delete an ingredient from the user's shopping list
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the ingredient to delete
 *     responses:
 *       200:
 *         description: Successful response with updated shopping list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Ingredient deleted successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: Error message here
 */

module.exports = router;