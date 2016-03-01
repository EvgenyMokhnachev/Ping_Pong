'use strict';

var parseurl = require('parseurl');
var UserService = require('./UserService.js');

module.exports = (function(){

    return {

        init: function(req){
            var session = req.session ? req.session : req.handshake.session;

            var views = session.views;
            var sessionUser = session['user'];

            if (!views) {
                views = session.views = {};
            }

            if(!sessionUser) {
                sessionUser = session.user = {};
            }

            var pathname = parseurl(req)['pathname'];
            views[pathname] = (views[pathname] || 0) + 1;
        },

        setUser: function(req, user) {
            var session = req.session ? req.session : req.handshake.session;
            session['user']['id'] = user['id'];
        },

        getUserId: function(req) {
            var session = req.session ? req.session : req.handshake.session;
            return session['user']['id'];
        },

        getUser: function(req, callback){
            var session = req.session ? req.session : req.handshake.session;
            UserService.getUserById(session['user']['id'], callback);
        },

        logOutUser: function(req) {
            var session = req.session ? req.session : req.handshake.session;
            session['user'] = {};
        }
    }

})();