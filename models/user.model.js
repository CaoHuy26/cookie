const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const userSchema = mongoose.model('User', UserSchema);

module.exports = userSchema;