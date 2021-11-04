var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),

	Campground = require("./models/campgrounds"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds"),
	favicon = require('serve-favicon');;

var campgroundRoutes = require("./routes/campgrounds"),
	commentsRoutes = require("./routes/comments"),
	indexroutes = require("./routes/index");

//seed the database
// seedDB();

//Setup Express Session
app.use(require("express-session")({
	secret: "This Is The Time",
	resave: false,
	saveUninitialized: false
}));

// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//connect ot mongo db -- yelpcamp
//mongoose.connect("mongodb://localhost:27017/yelp_camp", 
//  {useNewUrlParser: true, useUnifiedTopology: true});
// Connect to MongoDB Atlas DB
mongoose.connect(process.env.DATABASEURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => {
	console.log("MongoDB Atlas Connected");
}).catch(err => {
	console.log("ERROR: " + err.message);
});

//Enable Parsing of body
app.use(bodyParser.urlencoded({ extended: true }));

// Define Rendering engine
app.set("view engine", "ejs");

// Enable Method-Override
app.use(methodOverride("_method"));

// Enable Flash Messagind
app.use(flash());

// set use of public dir
app.use(express.static(__dirname + "/public"));

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexroutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

// Enable LISTENER On PORT, If PORT not specified then default to 3000
var proc = process.env.PORT || 3000;

app.listen(proc, function () {
	console.log("The YelpCamp Server started on PORT " + proc);
});