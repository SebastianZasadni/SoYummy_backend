const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = Schema({
    title: {
        type: String,
        required: [true, 'Set name for category']
    },
    thumb: {
        type: String
    },
    description: {
        type: String
    }
});

const Category = mongoose.model("category", category);

module.exports = Category;