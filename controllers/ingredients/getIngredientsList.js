const Ingredient = require('../../models/ingredient');

const getIngredientsList = async (req,res,next) => {
    try {
        const ingredientsList = await Ingredient.find({});
        return res.status(200).json({
            status: "success",
            data: ingredientsList
        })
    } catch (error) {
        next(error);
    }
};

module.exports = getIngredientsList;