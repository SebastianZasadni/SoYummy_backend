const Recipe = require('../../models/recipe');

const deleteFavoriteRecipe = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { id } = req.params;
        const existingRecipe = await Recipe.find({ _id: id });
        if (!existingRecipe.length) {
            return res.status(400).json({
                status: "failed",
                message: "Recipe not exist"
            });
        };
        const isFavoriteAlready = existingRecipe.filter(recipe => recipe.favorites.includes(owner));
        if (!isFavoriteAlready.length) {
            return res.status(400).json({
                status: "failed",
                message: "Recipe isn't in favorites."
            });
        };
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { $pull: { favorites: owner } },
            { new: true }
        );

        console.log(updatedRecipe)
        const allFavoritesRecipes = await Recipe.find({ favorites: owner });
        return res.status(200).json({
            status: "success",
            data: { updatedRecipe, allFavoritesRecipes },
            message: "Recipe has deleted from favorites."
        })

    } catch (error) {
        next(error);
    };
};

module.exports = deleteFavoriteRecipe;