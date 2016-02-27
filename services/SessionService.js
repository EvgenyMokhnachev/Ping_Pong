'use strict';

var parseurl = require('parseurl');
var UserService = require('./UserService.js');

module.exports = (function(){

    return {

        init: function(req){
            var views = req.session.views;
            var sessionUser = req.session['user'];

            if (!views) {
                views = req.session.views = {};
            }

            if(!sessionUser) {
                sessionUser = req.session.user = {};
            }

            var pathname = parseurl(req)['pathname'];
            views[pathname] = (views[pathname] || 0) + 1;
        },

        setUser: function(req, user) {
            req.session['user']['id'] = user['id'];
        },

        getUserId: function(req) {
            return req.session['user']['id'];
        },

        getUser: function(req, callback){
            UserService.getUserById(req.session['user']['id'], callback);
        },

        logOutUser: function(req) {
            req.session['user'] = {};
        }
    }

})();