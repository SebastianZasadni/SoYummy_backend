const User = require('../../models/user');

const addIngredientToShoppingList = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { measure, title, thumb } = req.body;
        const { _id } = req.user;
        const response = await User.findOneAndUpdate(
            _id,
            { $addToSet: { shoppingList: { id, measure, title, thumb } } },
            { new: true },
        );
        return res.status(200).json({
            status: "success",
            data: response.shoppingList,
            message: "Ingredient add successfuly"
        })
    }
    catch (error) {
        next(error);
    }
};

module.exports = addIngredientToShoppingList;