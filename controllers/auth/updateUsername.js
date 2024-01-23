const User = require('../../models/user');

const updateUsername = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { username } = req.body;
        await User.findOneAndUpdate(_id, { name: username });
        return res.status(200).json({
            status: "success",
            data: username,
            message: "Username has been change successfuly"
        })
    } catch (error) {
        next(error);
    }
};

module.exports = updateUsername;
