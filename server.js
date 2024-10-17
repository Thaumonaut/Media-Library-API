const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const SwaggerUI = require('swagger-ui-express')
const swagggerDocument = require('./middleware/swagger.json')
const { connectDb } = require('./database/db.js');
require("dotenv").config()
app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swagggerDocument))
app.use('/', require('./routes/main'));

connectDb().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.log('Failed to connect to the database', err.message);
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})