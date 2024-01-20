const User = require('../../models/user');

const uploadImage = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { image } = req.body;
        const response = await User.findOneAndUpdate(_id, { thumb: image });
        return res.status(200).json({
            status: "success",
            data: response,
            message: "Photo add successfuly"
        })
    } catch (error) {
        next(error);
    }
};

module.exports = uploadImage;