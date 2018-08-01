const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyparser = require('body-parser'),
      methodOverride = require('method-override');

const pollRoutes = require("./routes/polls.js") 

mongoose.connect('mongodb://localhost/voting-app');

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));

app.use('/polls', pollRoutes);

app.get('/', function(req, res){
  res.render('landing');
})

app.listen(process.env.PORT, function(){
    console.log("server started");
})


// Add restful routes