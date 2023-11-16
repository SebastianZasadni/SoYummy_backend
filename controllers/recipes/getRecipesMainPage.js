const Recipe = require('../../models/recipe');

const getRecipesMainPage = async (req, res, next) => {
    try {
        const breakfastRecipes = await Recipe.find({ category: "Breakfast" }).limit(4);
        const miscellaneousRecipes = await Recipe.find({ category: "Miscellaneous" }).limit(4);
        const chickenRecipes = await Recipe.find({ category: "Chicken" }).limit(4);
        const dessertsRecipes = await Recipe.find({ category: "Desserts" }).limit(4);

        return res.status(200).json({
            status: "success",
            breakfastRecipes,
            miscellaneousRecipes,
            chickenRecipes,
            dessertsRecipes
        })
    } catch (error) {
        next(error);
    }
};

module.exports = getRecipesMainPage;
