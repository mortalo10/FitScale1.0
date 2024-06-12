const express = require('express');
const { authJwt, verifySignUp, } = require('../middlewares');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('layouts/index');
});

router.get('/index', (req, res) => {
  res.render('layouts/index');
});
  
router.get("/historial", (req, res) => {
    res.render('layouts/historial', { layout: false });
});


module.exports = router;