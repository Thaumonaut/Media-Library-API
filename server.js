const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { connectDb } = require('./database/db.js');
const { auth } = require("express-openid-connect");

// Require Environment Variables
require("dotenv").config()

// Use Statements
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())

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
  // afterCallback: (req, res, session, decoded) => {
  //   console.log(session)
  //   return {
  //     ...session
  //   }
  // }
}));

app.use('/', require('./routes/main'));

// Database Connection
connectDb().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.log('Failed to connect to the database', err.message);
});

const port = process.env.PORT || 3000;
const host = process.env.NODE_ENV == "production" ? process.env.BASE_URL : `http://localhost:${process.env.PORT || 3000}`

// Start Server
app.listen(port, () => {
  console.log(`Media Library API is running ${host}`);
})