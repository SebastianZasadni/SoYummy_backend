const User = require('../../models/user');

const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: null }, { new: true });
        return res.status(200).json({
            message: `User with ${req.user.email} is logged out`
        })
    } catch (error) {
        next(error);
    };
};

module.exports = logout;