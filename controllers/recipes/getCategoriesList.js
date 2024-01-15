const Category = require('../../models/category');

const getCategoriesList = async (req, res, next) => {
    try {
        const categoriesList = await Category.find({});
        return res.status(200).json({
            status: "success",
            data: categoriesList.sort()
        });

    } catch (error) {
        next(error);
    }
}

module.exports = getCategoriesList;
