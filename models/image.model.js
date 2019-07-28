const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    user: String,
    imageContent: String,
    status: String,
    location: String,
    dateUpload: {
        type: Date,
        default: Date.now()
    },
    reactions: {
        type: Number,
        default: 0
    },
    comments: [{
        user: String,
        comment: String,
        date: {
            type: Date,
            default: Date.now()
        },
        reactions: {
            type: Number,
            default: 0
        }
    }]
});

const imageModel = mongoose.model('Image', ImageSchema);

module.exports = imageModel;