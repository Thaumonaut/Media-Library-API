const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.use('/', require('./routes/main'));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})