const express = require('express');
const router = express.Router();

const getIngredientsList = require('../controllers/ingredients/getIngredientsList');
const getRecipesByIngredients = require('../controllers/ingredients/getRecipesByIngredients');

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

module.exports = router;