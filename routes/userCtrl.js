var express = require('express');
var router = express.Router();
var Response = require('../utils/Response.js');
var UserService = require('../services/UserService.js');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  UserService.checkUserAccess(req.body.email, req.body.password,
      function(){
        var response = new Response();
        res.send(response);
      },
      function(error){
        var response = new Response();
        response.setError(error);
        res.send(response);
      }
  );
});

router.post('/register', function(req, res, next) {
  UserService.register(
      req.body.email,
      req.body.password,
      function(user){
        var response = new Response();
        response.setDate(user);
        res.send(response);
      },
      function(error){
        var response = new Response();
        response.setError(error);
        res.send(response);
      }
  );
});

module.exports = router;
