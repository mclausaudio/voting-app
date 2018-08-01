var mongoose = require('mongoose');
var Poll = require('./models/poll.js');

var data = [
    {
        title: "A nice poll",
        options: [
            {
                text: "Oh yeah nice",
                count: 3
            },
            {
                text: "ohhhhhhhh boy",
                count: 5
            },
        ]        
    },
    {
        title: "A nice poll",
        options: [
            {
                text: "Oh yeah nice",
                count: 3
            },
            {
                text: "ohhhhhhhh boy",
                count: 5
            },
        ]        
    },
]

function seedDB () {
    Poll.remove({}, function(err){
        if(err) {
            console.log(err)
        } else {
            console.log("seeds cleared");
            //to prevent database creation during development, comment out the code below
            /*data.forEach(function(seed){
                Poll.create(seed, function(err, seedPost){
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('seed added')
                    }
                })
            });*/
        }
    })
}

module.exports = seedDB;