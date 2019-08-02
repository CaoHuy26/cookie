const User = require('../models/user.model');
const Image = require('../models/image.model');

module.exports.getEdit = (req, res) => {
    res.status(200).render('users/edit');
};

module.exports.getUser = (req, res) => {
    const id = req.params.id;
    User.findById(id).then((user) => {
        Image.find({user: user.username}).then((images) => {
            res.status(200).render('users/user', { user: user, images: images });
        })
    });
};

module.exports.updateUserById = (req, res) => {
    const id = req.params.id;

    User.findByIdAndUpdate({ _id: id }, {
        ...req.body,
        avatar: req.file.path.split('\\').slice(1).join('\\'),
    }).then(() => {
        res.status(200).json('Updated');
    });
};

module.exports.deleteUserById = (req, res) => {
    const id = req.params.id;
    User.deleteOne({_id: id}).then(() => {
        console.log(`Delete ${id} success!!`);
        res.status(200).redirect('/');
    });
 };