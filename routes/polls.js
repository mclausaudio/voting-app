const express = require("express"),
    router = express.Router();
    
const Poll = require('../models/poll.js');

// Index Route
router.get('/', function(req, res){
    Poll.find({}, function(err, Polls) {
        if (err) {
            console.log(err)
        } else {
            res.render('polls/index', {polls: Polls});    
        }
    })
});
//New Route
router.get('/new', function(req, res){
    res.render('polls/new');
});
// Post Route for New Poll
router.post('/', function(req, res){
    
    var title = req.body.title,
        options = req.body.options;
    
    var newPoll = {title: title, options: options};
    
    Poll.create(newPoll, function(err, newlyCreated){
        if (err) {
            console.log(err)
            res.send("Something went horribly wrong :o");
        } else {
            console.log(newlyCreated);
            res.redirect('/polls')
        }
    })
});
// Show Route
router.get('/:id', function(req, res){
    Poll.findById(req.params.id, function(err, poll){
        if (err) {
            console.log(err)
            res.redirect('back')
        } else {
            var optionData = [...poll.options];
            console.log(optionData);
            var optionArray = []
            optionData.forEach(function(option){
                optionArray.push([option.text, option.count]);
            })
            console.log(optionArray);
            res.render('../views/polls/show', {poll: poll, optionArray: JSON.stringify(optionArray)})
        }
    })
})
//Update route - increases option count by 1
router.put('/:id', function(req, res){
var optionId = req.body.votedFor;
var options;

Poll.findById(req.params.id, function(err, poll){
    if (err) {
        console.log(err)
    } else {
        options = poll.options;
        console.log(options)
        options.forEach(function(option){
            if (option._id == optionId) {
                option.count+=1;
                console.log(option)
            }
        })
    }
    Poll.findByIdAndUpdate(req.params.id, {options: options}, function(err, updatedPoll){
        if (err) {
            console.log(err)
        } else {
             res.redirect('/polls/' + req.params.id);    
        }
    })
})


// Poll.findByIdAndUpdate(req.params.id, options., function(err, updatedPoll){
//     if(err){
//         console.log(err)
//     } else {
//         res.redirect('/polls/' + req.params.id);
//     }
// })

})
    
    
module.exports = router;