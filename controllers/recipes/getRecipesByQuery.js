const Recipe = require('../../models/recipe');

const getRecipesByQuery = async (req, res, next) => {
    try {
        const { query } = req.query;
        const recipes = await Recipe.find({});
        const recipesByQuery = recipes.filter(recipe => recipe.title.toLowerCase().includes(query.toLowerCase()));
        if (!recipesByQuery.length) {
            res.status(400).json({
                status: "failed",
                message: "Recipes not found"
            });
        }
        return res.status(200).json({
            status: "success",
            recipes: recipesByQuery
        })
    } catch (error) {
        next(error);
    }
};

module.exports = getRecipesByQuery;