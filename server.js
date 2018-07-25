const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyparser = require('body-parser');

const pollRoutes = require("./routes/polls.js") 

mongoose.connect('mongodb://localhost/voting-app');

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));

app.use('/polls', pollRoutes);

app.get('/', function(req, res){
  res.redirect('/polls');
})

app.listen(process.env.PORT, function(){
    console.log("server started");
})