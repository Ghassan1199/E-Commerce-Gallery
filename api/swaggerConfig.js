const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {

    definition: {

        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'Abo Mariam Vape Store API Documentation',
            version: '0.2',
            description: 'This is the API Documentation for Abo Mariam Vape Store',
        },
        servers: [
            {
                url: 'https://abomariambackend.vercel.app/',
                description: "this is the vercel server (serverless)"

            },
            {
                url: 'https://abomariamvapestorebackend.onrender.com',
                description: "this is the render server (might be at a sleep state)"
            },
            {
                url: 'http://localhost/{port}',
                description: "if you want to try it locally",
                variables: {
                    port: {
                        default: "3000",
                        enum: [
                            "3000", "8080"
                        ],
                    }
                }
            }
        ],
    },
    apis: [path.join(__dirname, './routes/*.js')],


};

const specs = swaggerJsdoc(options);

module.exports = specs;
