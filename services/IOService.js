'use strict';

module.exports = (function(){

    var io = undefined;

    var on_waiters = [];
    var use_waiters = [];

    function on(eventName, func){
        if(io){
            io.on(eventName, func);
        } else {
            on_waiters.push({
                eventName: eventName,
                func: func
            });
        }
    }

    function use(nechto){
        if(io){
            io.use(nechto);
        } else {
            use_waiters.push(nechto);
        }
    }

    return {

        init: function(http){
            io = require('socket.io')(http);
            use_waiters.forEach(function(nechto){
                use(nechto);
            });
            on_waiters.forEach(function(waiter){
                on(waiter.eventName, waiter.func);
            })
        },
        
        on: on,

        send: function(eventName, data){
            io.emit(eventName, data);
        },

        use: use

    }

})();