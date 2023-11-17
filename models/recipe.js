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
        faroties: {
            type: Array
        },
        youtube: {
            type: String
        },
        ingredients:
        {
            type: Array
        }


    }
)

const Recipe = mongoose.model("recipe", recipe);

module.exports = Recipe;