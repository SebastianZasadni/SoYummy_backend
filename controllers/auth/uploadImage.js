const User = require('../../models/user');

const uploadImage = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { image } = req.body;
        await User.findOneAndUpdate(_id, { thumb: image });
        return res.status(200).json({
            status: "success",
            data: image,
            message: "Photo has been added successfuly"
        })
    } catch (error) {
        next(error);
    }
};

module.exports = uploadImage;