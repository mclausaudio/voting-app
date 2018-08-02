const express = require("express"),
    router = express.Router();
    
const Poll = require('../models/poll.js');

const middlewareObj = require('../middleware/auth.js');

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
router.get('/new', middlewareObj.isLoggedIn, function(req, res){
    res.render('polls/new');
});
// Post Route for New Poll
router.post('/', middlewareObj.isLoggedIn, function(req, res){
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
            var optionArray = []
            var totalCount = 0;
            optionData.forEach(function(option){
                totalCount += option.count;
                optionArray.push([option.text, option.count]);
            })

            var topAnswer = findTopAnswer(optionData);

            res.render('../views/polls/show', {poll: poll, optionArray: JSON.stringify(optionArray), totalCount: totalCount, topAnswer: topAnswer});
        }
    })
});

//Update options to add new option
router.put('/newoption/:id', middlewareObj.isLoggedIn, function(req, res){
    console.log('made it to the add a new option route');
    var newOption;
    var newOptionsArray;
    Poll.findById(req.params.id, function(err, poll){
        if (err) {
            console.log('we made it to find id and update but theres an error, check below:')
            console.log(err)
        } else {
            console.log('poll.options is ==== ' + poll.options )
            newOptionsArray = poll.options;
            console.log("options -------- " + newOptionsArray);
            newOption = {
                text: req.body.newOption,
                count: 1
            }
            console.log("newOption -------- " + JSON.stringify(newOption));
            newOptionsArray.push(newOption);
            console.log('The new options after pushing ------- ' + newOptionsArray);
        }
        Poll.findByIdAndUpdate(req.params.id, {options: newOptionsArray}, function(err, updatedPoll){
            if (err) {
                console.log(err)
            } else {
                 res.redirect('/polls/' + req.params.id);    
            }
        });        
    });
});
//Update route - increases option count by 1
router.put('/:id', middlewareObj.isLoggedIn, function(req, res){
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
            }
        })
    }
    Poll.findByIdAndUpdate(req.params.id, {options: options}, function(err, updatedPoll){
        if (err) {
            console.log(err);
        } else {
             res.redirect('/polls/' + req.params.id);
        }
    })
})
});





let findTopAnswer = function(array) {
    let leader = 0;
    let answer = ""
    array.forEach(function(option, i){
        if (option.count > leader) {
            leader = option.count;
            answer = option.text;
        }
    });
    return answer;
}
 
    
module.exports = router;