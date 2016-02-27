(function(){
    var email = document.getElementById('email'),
        password = document.getElementById('password'),
        logIn = document.getElementById('logIn'),
        signUp = document.getElementById('signUp'),
        statusText = document.getElementById('statusText');

    logIn.addEventListener('click', function(){
        Ajax.postAppJson('/user/login', {
            email: email.value,
            password: password.value
        }, function(responce){
            console.log(responce);
        }, function(error){
            console.log(error);
        });
    });

    signUp.addEventListener('click', function(){
        Ajax.postAppJson('/user/register', {
            email: email.value,
            password: password.value
        }, function(responce){
            console.log(responce);
        }, function(error){
            console.log(error);
        });
    });


})();