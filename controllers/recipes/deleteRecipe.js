const Recipe = require('../../models/recipe');

const deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;
        const deleteRecipe = await Recipe.findOneAndDelete({ _id: id, owner: _id });
        if (!deleteRecipe) {
            return res.status(400).json({
                status: "failed",
                message: "Recipe not found"
            });
        }
        const newRecipes = await Recipe.find({ owner: _id })
        return res.status(200).json({
            status: "success",
            message: "Recipe deleted",
            recipe: newRecipes
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteRecipe;