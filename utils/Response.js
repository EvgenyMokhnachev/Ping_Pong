'use strict';

function Response(){
    this.success = true;
    this.code = 0;
    this.data = null;
}

Response.prototype.setError = function(date, code){
    this.success = false;
    this.date = date;
    this.code = code;
};

Response.prototype.setDate = function(data, code){
    this.data = data;
    this.code = code;
};

Response.prototype.isSuccess = function(){
    return this.success;
};

module.exports = Response;