var express = require('express');
var router = express.Router();
var SessionService = require('../services/SessionService.js');

/* GET home page. */
router.get('/*', function(req, res, next) {
  if(!SessionService.getUserId(req)){
    res.render('authorization');
  } else {
    next();
  }
});

module.exports = router;
