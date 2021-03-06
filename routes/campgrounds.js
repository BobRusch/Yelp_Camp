var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");

router.get("/", function(req,res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	});
});

//Define the CREATE Route
router.post("/", middleware.isLoggedIn, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id : req.user._id,
		username : req.user.username
	};
	var newCampground = { name: name, image: image, description: description, author: author };
	
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			req.flash("success", "Campground: " +  newlyCreated.name + ", was successfully added");
			res.redirect("/campgrounds");
		}
	});
});

//Define the NEW Route
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

//Define the SHOW Route
router.get("/:id", function(req,res){
	//Find the campground with the provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log("ERROR " + err);
		} else {
			console.log("CAMPGROUND: " + foundCampground.name + " " + foundCampground.price)
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
	console.log("ID: " + req.params.id);
	Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground});
	});
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (updatedCampground){
			req.flash("success", "Campground: " +  updatedCampground.name + ", was successfully updated");
			res.redirect("/campgrounds/" + req.params.id);
	});
});


// DELETE Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;
