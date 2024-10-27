const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { auth } = require("express-openid-connect");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(auth({
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER,
  clientSecret: process.env.CLIENT_SECRET,
  authorizationParams: {
    response_type: "code id_token",
    audience: "https://library.media.com",
    scope: "openid profile email",
  },
}));

app.use('/', require('../routes/main'));

module.exports = app;