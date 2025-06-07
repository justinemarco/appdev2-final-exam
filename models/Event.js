const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    title: String,
    location: String,
    date: Date,
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event