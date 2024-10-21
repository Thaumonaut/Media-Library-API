const { auth } = require('express-openid-connect');

const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
    info: {
        title: 'Media Library Api',
        description: 'Search through your favorite media with a simple to use REST API.',
    },
    host: process.env.NODE_ENV == "production" ? 'media-library-api-hjxz.onrender.com' : `localhost:${process.env.PORT || 3000}`,
    schemes: process.env.NODE_ENV == "production" ? ['https'] : ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: "oauth2",
            flow: "implicit",
            in: "header",
            name: "Authorization",
            authorizationUrl: "https://dev-4qlbmsi47ra8ygmw.us.auth0.com/authorize",
            tokenUrl: "https://dev-4qlbmsi47ra8ygmw.us.auth0.com/oauth/token",
            audience: "https://library.media.com",
            scopes: {
                "openid": "openid",
                "profile": "profile",
                "email": "email"
            }
        }
    }
};

const outputFile = "./swagger.json";
const endpointsFiles = ['../routes/main'];

// code that create the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);
