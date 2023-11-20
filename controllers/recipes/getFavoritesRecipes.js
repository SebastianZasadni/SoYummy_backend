const Recipe = require('../../models/recipe');

const getFavoritesRecipes = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const recipes = await Recipe.find({ favorites: owner });
        if (!recipes.length) {
            return res.status(400).json({
                status: "failed",
                message: "Recipes not found."
            });
        };
        res.status(200).json({
            status: "success",
            recipes
        })
    } catch (error) {
        next(error);
    };
};

module.exports = getFavoritesRecipes;