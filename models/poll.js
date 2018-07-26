const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    title: String,
    options: [
        {
            text: String,
            count: {type: Number, default: 0}
        }
    ]
});

module.exports = mongoose.model("Poll", pollSchema);