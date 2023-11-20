const Recipe = require('../../models/recipe');

const addToFavorite = async (req, res, next) => {
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
        if (isFavoriteAlready.length) {
            return res.status(400).json({
                status: "failed",
                message: "Recipe is already in favorites."
            });
        };
        await Recipe.findByIdAndUpdate({ _id: id }, { $addToSet: { favorites: owner } },);
        return res.status(200).json({
            status: "success",
            message: "Recipe successfuly has added to favorties"
        });

    } catch (error) {
        next(error);
    };
};

module.exports = addToFavorite;

