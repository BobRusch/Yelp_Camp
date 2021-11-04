var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
		price: "19.95",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			id : mongoose.Types.ObjectId("5e66c7127431cd13d3e86715"),
			username: "Snoopy"
		}
    },
    {
        name: "Desert Mesa", 
		price: "15.45",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    	author: {
			id : mongoose.Types.ObjectId("5e66c7127431cd13d3e86715"),
			username: "Snoopy"
		}
},
    {
        name: "Canyon Floor", 
		price: "18.95",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			id : mongoose.Types.ObjectId("5e67c3cb1fec3a02802ffa8f"),
			username: "Rick"
		}
    },
    {
        name: "Canyon Floor", 
		price: "21.35",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			id : mongoose.Types.ObjectId("5e6e713c906b97097f86fd31"),
			username: "Batman"
		}
    },
    {
        name: "Canyon Floor", 
		price: "15.33",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			id : mongoose.Types.ObjectId("5e67c3cb1fec3a02802ffa8f"),
			username: "Rick"
		}
    }
]


 
function seedDB(){
   //Remove all campgrounds
   Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.deleteMany({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                     if(err){
                         console.log(err)
                     } else {
                        console.log("added a campground");
            //             //create a comment
            // //             Comment.create(
            // //                 {
            // //                     text: "This place is great, but I wish there was internet",
            // //                     author: "Homer"
            // //                 }, function(err, comment){
            // //                     if(err){
            // //                         console.log(err);
            // //                     } else {
            // //                         campground.comments.push(comment);
            // //                         campground.save();
            // //                         console.log("Created new comment");
            // //                     }
            // //                 });
                   }
                 });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;