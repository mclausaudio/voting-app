var Poll = require('../models/poll.js');
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
};

middlewareObj.checkPollOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Poll.findById(req.params.id, function(err, foundPoll){
            if (err) {
                res.redirect('back');
            } else {
                if (foundPoll.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        })
    } else {
        res.redirect('back');
    }
}

module.exports = middlewareObj;