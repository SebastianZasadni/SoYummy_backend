const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'So Yummy API',
            version: '1.0.0',
            description: 'The So Yummy API allows users to register and log in, as well as perform various operations related to recipes.'

        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;