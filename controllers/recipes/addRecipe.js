const Recipe = require('../../models/recipe');

const addRecipe = async (req, res, next) => {
    try {
        const { title, about, category, thumb, time, preparation, ingredientsList
        } = req.body;
        const { _id: owner } = req.user;
        const newRecipe = await Recipe.create({
            title, category, instructions: preparation, description: about, thumb, preview: thumb, time,
            ingredients: ingredientsList, owner
        });
        res.status(200).json({
            status: "success",
            newRecipe,
            message: "Recipe added successfuly"
        })
    } catch (error) {
        next(error);
    }
};

module.exports = addRecipe;