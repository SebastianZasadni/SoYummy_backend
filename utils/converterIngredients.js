const Ingredient = require('../models/ingredient');

const converterIngredients = async (name) => {
    const ingredients = await Ingredient.find({});
    const ingredientsByTitle = ingredients.filter(ingredient => ingredient.ttl.toLowerCase() === (name.toLowerCase()));
    const ingredientsId = ingredientsByTitle.map(ingredient => ingredient.id);
    return ingredientsId;
};

module.exports = converterIngredients;

