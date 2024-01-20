const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    shoppingList: {
        type: Array, default: []
    },
    thumb: {
        type: String, default: [],
    },
    token: {
        type: String,
        default: null
    }
}, { versionKey: false, timestamps: true });

const User = mongoose.model("user", user);

module.exports = User;