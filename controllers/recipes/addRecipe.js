const Recipe = require('../../models/recipe');
const converterIngredients = require('../../utils/converterIngredients');

const addRecipe = async (req, res, next) => {
    try {
        const { title, category, area, instructions, description, thumb, preview, time, favorites, youtube, tags,
            ingredients } = req.body;
        const ingredientsIds = await Promise.all(ingredients.map(async (ingredient) => await converterIngredients(ingredient.name)));
        const convertedIngredients = ingredients.map((ingredient, index) => ({
            ...ingredient,
            name: ingredientsIds[index]
        }));
        const newRecipe = await Recipe.create({
            title, category, area, instructions, description, thumb, preview, time, favorites, youtube, tags,
            ingredients: convertedIngredients
        });
        res.status(200).json({
            status: "success",
            newRecipe,
            message: "Recipe added successfuly"
        })
    } catch (error) {
        next(error);
    }
};

module.exports = addRecipe;