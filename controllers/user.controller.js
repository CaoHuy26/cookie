const User = require('../models/user.model');
const Image = require('../models/image.model');

module.exports.getUser = (req, res) => {
    const id = req.params.id;
    User.findById(id).then((user) => {
        Image.find({user: user.username}).then((images) => {
            res.status(200).render('users/user', { user: user, images: images });
        })
    });
};

module.exports.deleteUserById = (req, res) => {
    const id = req.params.id;
    User.deleteOne({_id: id}).then(() => {
        console.log(`Delete ${id} success!!`);
        res.status(200).redirect('/');
    })
 };