const User = require('../../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string()
        .required(),
    name: Joi.string()
        .required(),
    password: Joi.string()
        .required()
});

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const validateRegister = registerSchema.validate({ name, email, password });
        if (validateRegister.error) {
            return res.status(400).json(validateRegister.error);
        }
        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(409).json({
                message: "Email in use"
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            password: hashedPassword,
            name
        });

        return res.status(201).json({
            status: "success",
            message: {
                createdUser: {
                    name,
                    email
                }
            }
        });
    } catch (error) {
        next(error);
    };
};

module.exports = signup;