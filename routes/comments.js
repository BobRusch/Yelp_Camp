var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//==================================
//      COMMENTS ROUTES
//==================================
//Define the NEW Route
router.get("/new", middleware.isLoggedIn, function(req,res){
	//res.send("You hit the NEW COMMENTS Page");
	//res.render("comments/new");
	//Find the campground with the provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log("ERROR " + err);
		} else {
			res.render("comments/new", {campground: foundCampground});
		}
	}); 
});

router.post("/", middleware.isLoggedIn, function(req,res){
	//Find the campground with the provided id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log("ERROR " + err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comments, function(err, newComment){
				if(err){
					console.log(err);
				} else {
					console.log ("USER IS " + req.user.username);
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
					foundCampground.comments.push(newComment);
					foundCampground.save();
					res.redirect("/campgrounds/" + foundCampground._id);
				}
			});
		}
	}); 
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", { campground_id : req.params.id, comment : foundComment });  
		}
	});
});

// UPDATE Comment route

router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comments, function (updatedComment){
		res.redirect("/campgrounds/" + req.params.id);
	});
});

// DELETE Comment Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});
module.exports = router;
