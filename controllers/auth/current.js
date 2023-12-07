const User = require('../../models/user');

const current = async (req, res, next) => {
    try {
        const { email, name } = req.user;
        return res.json({
            name, email
        })
    } catch (error) {
        next(error);
    };
};

module.exports = current;