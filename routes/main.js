const router = require('express').Router();
const mongodb = require("../database/db.js")

// Swagger Imports
const SwaggerUI = require('swagger-ui-express')
const swagggerDocument = require('../middleware/swagger.json')

router.get('/', (req, res) => {
  res.send('Hello World!');
})

router.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swagggerDocument))

router.use('/movies', require('./movies'))

router.use('/books', require('./books'))//#swagger.tags=['Books']

router.use('/music', require('./music')//#swagger.tags=['Music']
)

router.get('/games', (req, res) => {
  res.send('Replace with games route');
})


module.exports = router