const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const { connectDb } = require('./database/db.js');

// Require Environment Variables
require("dotenv").config()

// Use Statements
app.use(cors());
app.use(bodyParser.json());
app.use('/', require('./routes/main'));

// Database Connection
connectDb().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.log('Failed to connect to the database', err.message);
});

// Set Port
const port = process.env.PORT || 3000;

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})