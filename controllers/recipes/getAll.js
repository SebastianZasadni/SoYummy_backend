const Recipe = require('../../models/recipe');

const getAll = async (req, res, next) => {
    try {
        const totalRecipes = await Recipe.find({}, "-createdAt -updatedAt");
        return res.status(200).json({
            status: "success",
            totalRecipes: totalRecipes
        });
    } catch (error) {
        next(error);
    }
}

module.exports = getAll;