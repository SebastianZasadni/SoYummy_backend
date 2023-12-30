require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        transformation: [
            { width: 350, crop: "scale" },
            { quality: "auto" },
            { fetch_format: "auto" }
        ],
        resource_type: "auto",
    });
    return res;
}

const storage = new multer.memoryStorage();
const upload = multer({
    storage,
});

module.exports = { upload, handleUpload };