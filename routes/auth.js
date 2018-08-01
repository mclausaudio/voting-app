const express = require("express"),
    router = express.Router(),
    passport = require("passport");
    
const User = require('../models/user.js');

//Show sign up form
router.get('/signup', function(req, res){
    res.render('signup');
});
//POST route
router.post('/signup', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect('/polls');
        })
    });
    
})




//Shows login form
router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect:"/polls",
    failureRedirect: "/login"
}), function(req, res){
    //empty, the middleware handles the redirecting
})

//Logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/polls');
});

module.exports = router;