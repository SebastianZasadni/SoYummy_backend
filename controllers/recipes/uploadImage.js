const { handleUpload } = require('../../middleware/multer');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            throw new Error("Image didn't upload.");
        }
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
};

module.exports = uploadImage;