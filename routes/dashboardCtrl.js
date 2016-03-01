var express = require('express');
var router = express.Router();

var SessionService = require('../services/SessionService.js');
var IOService = require('../services/IOService.js');
var PlayersService = require('../services/PlayersService.js');

router.get('/', function(req, res, next) {
    res.render('dashboard');
});

IOService.on('connection', function(socket){
    SessionService.getUser(socket, function(user){

        PlayersService.addAvailablePlayer(user);

        IOService.send('newPlayer', user);

        socket.emit('me', {
            user: (function(){
                user.password = undefined;
                return user;
            })(),
            availablePlayers: PlayersService.getAvailablePlayers()
        });

        socket.on('disconnect', function(){
            IOService.send('disconnectedPlayer', user);
            PlayersService.removeAvailablePlayer(user);
        });
    });
});

module.exports = router;
