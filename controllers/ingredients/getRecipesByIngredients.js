const Recipe = require('../../models/recipe');
const converterIngredients = require('../../utils/converterIngredients');

const getRecipesByIngredients = async (req, res, next) => {
    try {
        const { ingredient } = req.query;
        const recipes = await Recipe.find({})
        const ingredientId = await converterIngredients(ingredient);
        const recipesByIngredient = recipes
            .filter(recipe =>
                recipe.ingredients
                    .some(ingredient => ingredientId.includes(ingredient.id.toString())));
        res.json({ recipes: recipesByIngredient, count: recipesByIngredient.length });
    }
    catch (error) {
        next(error);
    };

};
module.exports = getRecipesByIngredients;

