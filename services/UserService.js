var User = require('../models/User.js');

module.exports = (function(){

    function isAvailableEmail(email, success, error){
        User
            .findOne({
                email: email
            })
            .select('email')
            .exec(function(err, user){
                if(user) {
                    if(error){
                        error({
                            message: 'User with the entered email exist'
                        });
                    }
                } else {
                    if(success) {
                        success();
                    }
                }
            });
    }

    return {
        checkUserAccess: function(email, password, success, error){
            User
                .findOne({
                    email: email
                })
                .select('password')
                .exec(function(err, user){
                    if(err) {
                        if(error) {
                            error(err);
                            return;
                        }
                    }

                    if(!user) {
                        if(error) {
                            error({
                                message: 'User with the entered email does not exist'
                            })
                        }
                    } else {
                        if(user.password === password) {
                            if(success) {
                                success(user);
                            }
                        } else {
                            if(error) {
                                error({
                                    message: 'Incorrect password'
                                });
                            }
                        }
                        //TODO доделать проверку по паролю
                    }
                });
        },

        isAvailableEmail: isAvailableEmail,

        register: function(email, password, success, error){
            isAvailableEmail(
                email,
                function(){
                    var user = new User({
                        email: email,
                        password: password
                    });

                    user.save(function(err){
                        if(err) {
                            if(error) {
                                error(err);
                                return;
                            }
                        }

                        if(success) {
                            success(user);
                        }
                    });
                },
                error
            );
        }
    }

})();