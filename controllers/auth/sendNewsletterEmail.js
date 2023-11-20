const User = require('../../models/user');
const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = process.env;

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    }
}
);

const mailOptions = (email) => {
    return {
        from: EMAIL_USER,
        to: email,
        subject: "SoYummy newsletter",
        html: `<p>Hello,</p>
        <p>You have successfully subscribed to our newsletter.</p>
        <p>Best regards, So Yummy</p>`
    }
}

const sendNewsletterEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        transporter.sendMail(mailOptions(email));
        res.json({
            msg: "Email has sent"
        })
    } catch (error) {
        next(error);
    };
};

module.exports = sendNewsletterEmail;