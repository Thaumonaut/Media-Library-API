const router = require('express').Router();
const mongodb = require("../database/db.js")

// Swagger Imports
const SwaggerUI = require('swagger-ui-express')
const swagggerDocument = require('../middleware/swagger.json');
const { checkAuth, ErrorHandler } = require('../middleware/auth.js');

const host = process.env.NODE_ENV == "production" ? process.env.BASE_URL : `http://localhost:${process.env.PORT || 3000}`

router.get('/', (req, res) => {
  /* #swagger.ignore = true */
  res.send(`To view docs, visit ${host}/api-docs`);
})

router.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swagggerDocument))

router.use(checkAuth);
router.use(ErrorHandler);

router.use('/movies', require('./movies')/*
* #swagger.tags=['Movies']
* #swagger.security = [{ "auth0": [] }]
*/)

router.use('/books', require('./books')/*#swagger.tags=['Books']*/)

router.use('/music', require('./music')/*#swagger.tags=['Music']*/)

router.use('/games', require('./games')/*#swagger.tags=['Games']*/)

module.exports = router