const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredient = Schema({
    ttl: {
        type: String,
        required: [true, 'Set name for ingredient']
    },
    desc: {
        type: String,
    },
    thb: {
        type: String
    }
});

const Ingredient = mongoose.model("ingredient", ingredient);

module.exports = Ingredient;