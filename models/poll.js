const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    title: String,
    option1: String,
    option2: String
});

module.exports = mongoose.model("Poll", pollSchema);