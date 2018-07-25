const express = require("express"),
    router = express.Router();
    
const Poll = require('../models/poll.js')
    
router.get('/', function(req, res){
    Poll.find({}, function(err, Polls) {
        if (err) {
            console.log(err)
        } else {
            res.render('polls/index', {polls: Polls});    
        }
    })
});

router.post('/', function(req, res){
    
    var title = req.body.title,
        option1 = req.body.option1,
        option2 = req.body.option2;
    
    var newPoll = {title: title, option1: option1, option2: option2};
    
    Poll.create(newPoll, function(err, newlyCreated){
        if (err) {
            console.log(err)
            res.send("Something went horribly wrong :o");
        } else {
            console.log(newlyCreated);
            res.redirect('/polls')
        }
    })
})
    
    
    
module.exports = router;