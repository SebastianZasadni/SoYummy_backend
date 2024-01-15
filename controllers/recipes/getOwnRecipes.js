const Recipe = require('../../models/recipe');

const getOwnRecipes = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const recipes = await Recipe.find({ owner });
        if (!recipes.length) {
            return res.status(400).json({
                status: "failed",
                message: "Current user don't have any recipes."
            });
        };
        return res.status(200).json({
            status: "success",
            data: recipes
        })
    } catch (error) {
        next(error);
    };
};

module.exports = getOwnRecipes;