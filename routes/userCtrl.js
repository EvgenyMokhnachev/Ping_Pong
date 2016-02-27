var express = require('express');
var router = express.Router();
var Response = require('../utils/Response.js');
var UserService = require('../services/UserService.js');
var SessionService = require('../services/SessionService.js');

/* GET users listing. */
router.post('/login', function (req, res, next) {
    UserService.checkUserAccess(req.body.email, req.body.password,
        function (user) {
            SessionService.setUser(req, user);
            res.location('/');
            res.send(new Response());
        },
        function (error) {
            var response = new Response();
            response.setError(error);
            res.status(403);
            res.send(response);
        }
    );
});

router.post('/register', function (req, res, next) {
    UserService.register(
        req.body.email,
        req.body.password,
        function (user) {
            SessionService.setUser(req, user);
            res.location('/');
            res.send(new Response());
        },
        function (error) {
            var response = new Response();
            response.setError(error);
            res.status(409);
            res.send(response);
        }
    );
});

module.exports = router;
