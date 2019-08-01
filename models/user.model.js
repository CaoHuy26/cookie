const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: {
        type: String,
        default: "../../../../img/default/avatar-user.png",
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const userSchema = mongoose.model('User', UserSchema);

module.exports = userSchema;