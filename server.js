const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      bodyparser = require('body-parser'),
      methodOverride = require('method-override');
      
const User = require('./models/user.js'),
    seedDB = require('./seeds.js');
      
      

const pollRoutes = require("./routes/polls.js"),
      authRoutes = require("./routes/auth.js");

// mongodb://localhost/voting-app
// mongodb://<dbuser>:<dbpassword>@ds111082.mlab.com:11082/pollux
mongoose.connect('mongodb://mike:pollux415@ds111082.mlab.com:11082/pollux');

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));

//express session config
app.use(require('express-session')({
    secret: 'SilvaElectronics',
    resave: false,
    saveUninitialized: false
}))

//passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this makes a currentUser variable available in 'locals', which makes currentUser available to all views
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


// seedDB();

//routes
app.use('/polls', pollRoutes);
app.use('/', authRoutes);

app.get('/', function(req, res){
  res.render('landing');
})

app.listen(process.env.PORT, function(){
    console.log("server started");
})


// Add restful routes