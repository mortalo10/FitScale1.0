const express = require('express');
const Evento = require("../models/evento");
const { authJwt, verifySignUp, } = require('../middlewares');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('layouts/index');
});

router.get('/index', (req, res) => {
  res.render('layouts/index');
});
  
router.get("/ingresado_con_exito", (req, res) => {
    res.render('layouts/ingresado_con_exito', { layout: false });
  });

module.exports = router;