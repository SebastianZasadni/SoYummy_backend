const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipe = Schema(
    {
        title: {
            type: String,
            required: [true, 'Set title for recipe']
        },
        category: {
            type: String,
            required: [true, 'Set category for recipe']
        },
        area: {
            type: String
        },
        instructions: {
            type: String
        },
        description: {
            type: String
        },
        thumb: {
            type: String
        },
        preview: {
            type: String
        },
        time: {
            type: String
        },
        favorites: {
            type: [String], default: []
        },
        youtube: {
            type: String
        },
        ingredients:
        {
            type: Array
        },
        owner: {
            type: String
        }


    }
)

const Recipe = mongoose.model("recipe", recipe);

module.exports = Recipe;