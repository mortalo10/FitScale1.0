const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const authenticate = require("./authenticate");
const obtenerTokenDeAcceso = require("./tokenAPI")

module.exports = {
  authJwt,
  verifySignUp,
  authenticate,
  obtenerTokenDeAcceso
};