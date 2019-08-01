const User = require('../models/user.model');

module.exports.deleteUserById = (req, res) => {
    const id = req.params.id;
    User.deleteOne({_id: id}).then(() => {
        console.log(`Delete ${id} success!!`);
        res.status(200).redirect('/');
    })
 };