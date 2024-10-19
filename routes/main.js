const router = require('express').Router();
const mongodb = require("../database/db.js")

// Swagger Imports
const SwaggerUI = require('swagger-ui-express')
const swagggerDocument = require('../middleware/swagger.json')

const host = process.env.NODE_ENV == "production" ? 'https://media-library-api-hjxz.onrender.com' : `http://localhost:${process.env.PORT || 3000}`

router.get('/', (req, res) => {
  res.send(`To view docs, visit ${host}/api-docs`);
})

router.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swagggerDocument))

router.use('/movies', require('./movies')/*#swagger.tags=['Movies']*/)

router.use('/books', require('./books')/*#swagger.tags=['Books']*/)

router.use('/music', require('./music')/*#swagger.tags=['Music']*/)

router.use('/games', require('./games')/*#swagger.tags=['Games']*/)

module.exports = router