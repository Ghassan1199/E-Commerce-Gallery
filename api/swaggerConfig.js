const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {

    definition: {

        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'API Documentation', // Title of your API
            version: '1.0.0', // Version of your API
            description: 'This is the API documentation for my project.', // Description of your API
        },
        servers: [
            {
                url: 'https://abomariamvapestorebackend.onrender.com',
            },
            {
                url: 'http://localhost:5000', // API server URL
            }
        ],
    },
    apis: [path.join(__dirname, './routes/*.js')],


};

const specs = swaggerJsdoc(options);

module.exports = specs;
