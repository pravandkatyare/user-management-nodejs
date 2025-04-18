const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, "Please add a phone number"]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model in a Node.js application.