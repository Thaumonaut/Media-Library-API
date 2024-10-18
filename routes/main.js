const router = require('express').Router();
const mongodb = require("../database/db.js")

router.get('/', (req, res) => {
  res.send('Hello World!');
})


router.get('/auth', (req, res) => {
  res.send('Replace with auth route');
})

router.use('/movies', require('./movies'))

router.get('/books', (req, res) => {
  res.send('Replace with books route');
})

router.get('/music', (req, res) => {
  res.send('Replace with music route');
})

router.get('/games', (req, res) => {
  res.send('Replace with games route');
})


module.exports = router