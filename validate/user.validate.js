const User = require('../models/user.model');

module.exports.postCreateUser = (req, res, next) => {
    var errMessages = [];

    if (!req.body.username) {
        errMessages.push('Nhập tên');
    }

    if (!req.body.password) {
        errMessages.push('Nhập mật khẩu');
    }

    if (req.body.password !== req.body.re_password) {
        errMessages.push('Mật khẩu nhập lại không đúng');
    }

    if (errMessages.length > 0) {
        res.render('users/signup', {
            errMessages: errMessages,
            values: req.body
        });
        return;
    }

    next();
};