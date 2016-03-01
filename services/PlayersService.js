'use strict';

module.exports = (function(){

    var availablePlayers = [];

    return {

        addAvailablePlayer: function(user){
            availablePlayers.push(user);
        },

        removeAvailablePlayer: function(user){
            availablePlayers.splice(availablePlayers.indexOf(user), 1);
        },

        getAvailablePlayers: function(){
            return availablePlayers;
        }

    }

})();