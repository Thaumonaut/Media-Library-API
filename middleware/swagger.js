const { auth } = require('express-openid-connect');

const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
    info: {
        title: 'Media Library Api',
        description: 'Search through your favorite media with a simple to use REST API.',
    },
    host: process.env.NODE_ENV == "production" ? process.env.SWAGGER_URL : `localhost:${process.env.PORT || 3000}`,
    schemes: process.env.NODE_ENV == "production" ? ['https'] : ['http'],
    securityDefinitions: {
        auth0: {
            type: "oauth2",
            flow: "implicit",
            in: "header",
            name: "Authorization",
            authorizationUrl: process.env.ISSUER + "/authorize?audience=https://library.media.com",
            tokenUrl: process.env.ISSUER + "/oauth/token?audience=https://library.media.com",
        }
    }
};

const outputFile = "./swagger.json";
const endpointsFiles = ['../routes/main'];

// code that create the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);
