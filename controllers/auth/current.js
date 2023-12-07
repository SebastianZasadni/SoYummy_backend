const User = require('../../models/user');

const current = async (req, res, next) => {
    try {
        const { email, name, id } = req.user;
        return res.json({
            id, name, email
        })
    } catch (error) {
        next(error);
    };
};

module.exports = current;