var express = require('express');
var router = express.Router();
var SessionService = require('../services/SessionService.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dashboard');
});

module.exports = router;
