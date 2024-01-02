const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { SECRET } = process.env;

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
});

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validateLogin = loginSchema.validate({ email, password });
        if (validateLogin.error) {
            return res.status(400).json(validateLogin.error);
        }
        const isUser = await User.findOne({ email });
        const validPassword = isUser && await bcrypt.compare(password, isUser.password);

        if (!isUser || !validPassword) {
            return res.status(401).json({
                message: "Email or password isn't correct"
            })
        };

        const payload = { id: isUser._id, email };
        const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
        await User.findByIdAndUpdate(payload.id, { token });
        return res.status(200).json(
            {
                user: {
                    id: payload.id,
                    email: payload.email,
                    username: isUser.name,
                },
                token
            });

    } catch (error) {
        next(error);
    };
};

module.exports = login;