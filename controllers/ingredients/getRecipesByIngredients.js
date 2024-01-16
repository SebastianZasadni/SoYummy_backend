const Recipe = require('../../models/recipe');
const converterIngredients = require('../../utils/converterIngredients');

const getRecipesByIngredients = async (req, res, next) => {
    try {
        const { ingredient } = req.query;
        const recipes = await Recipe.find({})
        const ingredientId = await converterIngredients(ingredient);
        const ingredientIdToString = ingredientId.toString();
        const recipesByIngredient = recipes
            .filter(recipe =>
                recipe.ingredients
                    .some(ingredient => ingredientId.includes(ingredientIdToString)));
        return res.status(200).json({ data: recipesByIngredient, count: recipesByIngredient.length });
    }
    catch (error) {
        next(error);
    };

};
module.exports = getRecipesByIngredients;

