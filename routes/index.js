var express = require("express");
var passport = require("passport");
var User = require("../models/user");

var router  = express.Router({mergeParams: true});

// Default ROOT Route
router.get("/", function(req,res){
	res.render("landing");
});

// Define the INDEX Route
//==================================
//      AUTH ROUTES
//==================================
//Define the Register Route
router.get("/register", function(req,res){
	res.render("register");
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
    User.register( newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
			req.flash("error", err.message);
            res.render('register');
        } else {
			passport.authenticate("local")(req, res, function(){
				req.flash("success","Welcome to Yelpcamp, " + user.username + "!");
				res.redirect("/campgrounds");
			});
		}											   
    });
});

//Login Routes
router.get("/login", function(req,res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req,res){
	
});

router.get("/logout", function(req, res){
	req.logout();
	
	res.redirect("/campgrounds");
});

function isLoggedIn (req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("success", "You have been successfully logged out!");
	res.redirect("/login");
}

module.exports = router;
