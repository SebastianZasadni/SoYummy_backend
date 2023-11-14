const express = require('express');
const cors = require('cors');
const logger = require("morgan");
require('dotenv').config();
const recipesApi = require('./routes/recipes');

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.json());
app.use(express.static('public'));
app.use(logger(formatsLogger));
app.use(cors());

// app.use('/api/users', authApi);
// app.use('/api/ingredients', ingredientsApi);
app.use('/api/recipes', recipesApi);

app.use((_, res, __) => {
    res.status(404).json({ message: "Not found." });
});

app.use((err, _, res, __) => {
    res.status(500).json({
        message: err.message
    });
});

module.exports = app;