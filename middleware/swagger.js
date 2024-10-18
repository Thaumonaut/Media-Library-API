const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Media Library Api',
        description: 'Search through your favorite media with a simple to use REST API.',
    },
    host: process.env.NODE_ENV == "production" ? 'media-library-api-hjxz.onrender.com/' : `localhost:${process.env.PORT || 3000}`,
    schemes: ['http', 'https']
};

const outputFile = "./swagger.json";
const endpointsFiles = ['../routes/main'];

// code that create the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);