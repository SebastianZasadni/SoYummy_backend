const User = require('../../models/user');

const deleteIngredientFromShoppingList = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { id } = req.params;
        const data = await User.find({ _id });
        const { shoppingList } = data[0];

        const isIngredientInShoppingList = shoppingList.filter(ingredientId => ingredientId === id);

        if (!isIngredientInShoppingList.length) {
            return res.status(400).json({
                status: "failed",
                message: "Ingredient isn't in shopping list."
            });
        };
        const newShoppingList = shoppingList.filter(ingredientId => ingredientId !== id)
        const response = await User.findByIdAndUpdate(
            _id,
            { shoppingList: newShoppingList },
            { new: true }
        );
        return res.status(200).json({
            status: "success",
            response: response.shoppingList,
            message: "Ingredient has deleted from shopping list."
        })

    } catch (error) {
        next(error);
    };
};

module.exports = deleteIngredientFromShoppingList;