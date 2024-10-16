const router = require('express').Router();
const mongodb = require("../database/db.js")

router.get('/', (req, res) => {
  res.send('Hello World!');
})

//connect database
router.use("/data", require("../database/db.js"));


router.get('/auth', (req, res) => {
  res.send('Replace with auth route');
})

router.get('/movies', (req, res) => {
  res.send('Replace with movies route');
})

router.get('/books', (req, res) => {
  res.send('Replace with books route');
})

router.get('/music', (req, res) => {
  res.send('Replace with music route');
})

router.get('/games', (req, res) => {
  res.send('Replace with games route');
})


//init db
mongodb.initDb((err) => {
  if (!err) {
    console.log("Database initialized");
  }
});

module.exports = router