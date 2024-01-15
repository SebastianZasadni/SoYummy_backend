const Recipe = require('../../models/recipe');

const getRecipesByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const firstLetterUpCategory = category.charAt(0).toUpperCase() + category.slice(1);
        const { page = 1 } = req.query;
        const recipes = await Recipe.find({ category: firstLetterUpCategory })
            .limit(8)
            .skip(((page - 1) * 8));
        if (!recipes.length) {
            return res.status(400).json({
                status: "failed",
                message: "Recipes not found"
            })
        }
        return res.status(200).json({
            status: "success",
            data: recipes
        })
    } catch (error) {
        next(error);
    }
};

module.exports = getRecipesByCategory;