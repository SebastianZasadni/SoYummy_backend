const Recipe = require('../../models/recipe');

const getPopularRecipes = async (req, res, next) => {
    try {
        const popularRecipes = await Recipe.find({ 'favorites.0': { $exists: true } })
            .sort({ 'favorites.length ': 'desc' })
        res.status(200).json({
            status: "success",
            countOfPopularRecipes: popularRecipes.length,
            popularRecipes
        });
    } catch (error) {
        next(error);
    };
};

module.exports = getPopularRecipes;


