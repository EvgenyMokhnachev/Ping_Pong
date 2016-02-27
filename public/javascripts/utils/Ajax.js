//function Ajax(){
//    if(this.instance) {
//        return this.instance;
//    } else {
//        this.instance = this;
//    }
//}
//
//Ajax.prototype.postAppJson = function(path, data, success, error){
//    var req = new XMLHttpRequest();
//    req.open('POST', path, true);
//    req.setRequestHeader("Content-Type", "application/json");
//    req.onload = success;
//    req.onerror = error;
//    req.send(data);
//};

var Ajax = (function(){



    return {
        postAppJson: function(path, data, success, error){
            var req = new XMLHttpRequest();
            req.open('POST', path, true);
            req.setRequestHeader("Content-Type", "application/json");
            req.onload = success;
            req.onerror = error;
            req.send(JSON.stringify(data));
        }
    }

})();