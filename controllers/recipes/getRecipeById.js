const Recipe = require('../../models/recipe');

const getRecipeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipes = await Recipe.find({});
        const recipe = recipes.filter(recipe => recipe.id === id);
        if (!recipe.length) {
            return res.status(400).json({
                status: "failed",
                message: "Recipe not found"
            })
        }
        return res.status(200).json({
            status: "success",
            recipe: recipe
        });
    } catch (error) {
        next(error);
    }
}

module.exports = getRecipeById;

