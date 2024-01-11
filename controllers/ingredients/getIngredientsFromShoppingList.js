const User = require('../../models/user');

const getIngredientsFromShoppingList = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const response = await User.find({ _id }, { shoppingList: 1 });
        return res.status(200).json({
            status: "success",
            data: response[0].shoppingList,
        })
    } catch (error) {
        next(error)
    }
};

module.exports = getIngredientsFromShoppingList;