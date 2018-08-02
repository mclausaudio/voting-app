const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    title: String,
    options: [
        {
            text: String,
            count: {type: Number, default: 0}
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" 
        },
        username: String
    }
});

module.exports = mongoose.model("Poll", pollSchema);