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

router.get("/pesar", (req, res) => {
  res.render('layouts/pesar', { layout: false });
});

router.post("/pesar/alimento", (req, res) => {
  console.log(req.body)
  res.redirect("layouts/info_alimento")
});

router.get("/info_alimento", (req, res) =>{
  res.render('layouts/info_alimento')
})


module.exports = router;