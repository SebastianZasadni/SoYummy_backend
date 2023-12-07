const User = require('../../models/user');

const current = async (req, res, next) => {
    try {
        const user = req.user;
        return res.json({
           user
        })
    } catch (error) {
        next(error);
    };
};

module.exports = current;