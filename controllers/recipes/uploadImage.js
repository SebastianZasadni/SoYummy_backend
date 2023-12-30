const User = require('../../models/user.js');
const Jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');
const storeImage = path.join(process.cwd(), 'public/dishes');

const uploadImage = async (req, res, next) => {
    const { path: tempUpload } = req.file;
    const imageName = Date.now() + '.png';
    const imageURL = path.join(storeImage, imageName);
    try {
        const image = await Jimp.read(tempUpload);
        image.resize(340, 340);
        await image.writeAsync(imageURL);
        await fs.unlink(tempUpload);
        return res.status(200).json({ imageURL });
    } catch (err) {
        await fs.unlink(tempUpload);
        return next(err);
    }
};

module.exports = uploadImage;