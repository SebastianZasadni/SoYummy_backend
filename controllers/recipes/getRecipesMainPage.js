const Recipe = require('../../models/recipe');

const getRecipesMainPage = async (req, res, next) => {
    try {
        const { limit } = req.params;
        const breakfastRecipes = await Recipe.find({ category: "Breakfast" }).limit(limit);
        const miscellaneousRecipes = await Recipe.find({ category: "Miscellaneous" }).limit(limit);
        const chickenRecipes = await Recipe.find({ category: "Chicken" }).limit(limit);
        const dessertsRecipes = await Recipe.find({ category: "Dessert" }).limit(limit);

        return res.status(200).json({
            data: [...breakfastRecipes,
            ...miscellaneousRecipes,
            ...chickenRecipes,
            ...dessertsRecipes]
        })
    } catch (error) {
        next(error);
    }
};

module.exports = getRecipesMainPage;
