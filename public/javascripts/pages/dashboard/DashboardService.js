angular.module('dashboardApp').service('DashboardService', [function(){

    var dashboardWebSocket = io();

    var me = undefined;

    var init = false;

    var onInitCallbacks = [];
    var connectedNewPlayerCallbacks = [];
    var disconnectedPlayerCallbacks = [];

    var availablePlayers = [];
    availablePlayers.indexOf = function(user){
        for(var userIndex in availablePlayers){
            if(user._id === availablePlayers[userIndex]._id) {
                return parseInt(userIndex);
            }
        }
    };

    dashboardWebSocket.on('me', function(response){
        console.info('Im connected');

        me = response.user;

        response.availablePlayers.forEach(function(player){
            availablePlayers.push(player);
        });

        init = true;
        onInitCallbacks.forEach(function(callback){
            callback();
        });
    });

    dashboardWebSocket.on('newPlayer', function(user){
        onInit(function(){
            if(me._id !== user._id) {
                availablePlayers.push(user);
                connectedNewPlayerCallbacks.forEach(function(callback){
                    callback();
                });
            }
        });
    });

    dashboardWebSocket.on('disconnectedPlayer', function(user){
        availablePlayers.splice(availablePlayers.indexOf(user), 1);
        disconnectedPlayerCallbacks.forEach(function(callback){
            callback();
        });
    });

    function onInit(callback){
        typeof callback === 'function' ? (function(){
            if(init) {
                callback();
            } else {
                onInitCallbacks.push(callback);
            }
        })() : undefined;
    }

    return {

        onInit: onInit,

        connectedNewPlayer: function(callback){
            typeof callback === 'function' ? connectedNewPlayerCallbacks.push(callback) : undefined;
        },

        disconnectedPlayer: function(callback){
            typeof callback === 'function' ? disconnectedPlayerCallbacks.push(callback) : undefined;
        },

        getAvailablePlayers: function(){
            return availablePlayers;
        },

        getMe: function(){
            return me;
        }

    }

}]);
