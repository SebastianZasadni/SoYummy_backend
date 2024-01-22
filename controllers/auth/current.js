const User = require('../../models/user');

const current = async (req, res, next) => {
    try {
        const { email, name, id, token, thumb } = req.user;
        return res.status(200).json({
            id, name, email, token, thumb
        })
    } catch (error) {
        next(error);
    };
};

module.exports = current;