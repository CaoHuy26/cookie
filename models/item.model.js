const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    // image: String,
    image: {
        data: Buffer,
        contentType: String,
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const itemModel = mongoose.model('Item', ItemSchema);

module.exports = itemModel;