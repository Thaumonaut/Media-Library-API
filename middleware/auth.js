require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

const jwtAuth = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-4qlbmsi47ra8ygmw.us.auth0.com/.well-known/jwks.json",
  }),
  audience: process.env.AUDIENCE,
  issuer: 'https://dev-4qlbmsi47ra8ygmw.us.auth0.com/',
  algorithms: ["RS256"],
});

const checkAuth = (req, res, next) => {
  console.log(JSON.stringify(req.oidc.isAuthenticated()));
  if(req.appSession.access_token) {
    req.headers["authorization"] = `Bearer ${req.appSession.access_token}`;
  }
  jwtAuth(req, res, next);
}

const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(err.status).send({ message: err.message });
  }
  next(err);
};

module.exports = {jwtAuth, checkAuth, ErrorHandler: errorHandler};