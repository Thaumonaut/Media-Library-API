const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDb } = require('./database/db.js');

app.use(cors());
app.use(bodyParser.json());

app.use('/', require('./routes/main'));


// Database Connection
connectDb().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.log('Failed to connect to the database', err.message);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})