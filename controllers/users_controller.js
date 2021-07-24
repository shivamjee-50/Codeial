const User = require('../models/user');

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            } else{
                return res.redirect('/users/sign-in');
            }
        })
    }else {
        return res.redirect('/users/sign-in');
    }
}

module.exports.user = function(req, res){
    return res.end('<h1>This is User\'s main Page</h1>')
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

//Get the Sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.mail}, function(err, user){
        if(err){
            console.log('Error in finding the user');
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in creating user while signing up');
                    return;
                }

                return res.redirect('/users/sign-in');
            });
        } else{
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req, res){

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user in Signing In');
        }

        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        }else {
            res.redirect('back');
        }
    })
}