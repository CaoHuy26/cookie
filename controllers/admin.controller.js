// Database
const User = require('../models/user.model');
const Image = require('../models/image.model');

module.exports.index = (req, res) => {
    res.status(200).render('admin/admin.ejs');
};

/**
 * IMAGES
 */

module.exports.viewItems = (req, res) => {
    Image.find({}).then((images) => {
        res.status(200).render('images/view', { images: images });
    });
};


/**
 * USERS
 */

 module.exports.viewUsers = (req, res) => {
    User.find({}).then((users) => {
        res.status(200).render('users/view', {users: users});
    });
 };

 