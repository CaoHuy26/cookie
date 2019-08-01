const User = require('../models/user.model');

module.exports.getSignUp = (req, res) => {
    const errMessages = [];
    const values = {
        username: '',
        password: '',
    };
    res.status(200).render('auth/signup.ejs', { errMessages: errMessages, values: values });
};

module.exports.postSignUp = (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(newUser);
    User.create(newUser);
    res.status(200).redirect('/');
};

module.exports.getLogIn = (req, res) => {
    res.status(200).render('auth/login.ejs');
};

module.exports.postLogIn = (req, res) => {
    const { username, password } = req.body;
    User.findOne({username: username}).then((user) => {
        if (!user) {
            res.send(`Tài khoản ${username} không tồn tại`);
        }
        else {
            if (password != user.password) {
                res.send('Sai mật khẩu');
            }
            else { 
                req.session.user = { 
                    _id: user._id,
                    username: user.username,
                    avatar: user.avatar,
                    isAdmin: user.isAdmin
                };
                req.session.save();
                // Đăng nhập thành công
                res.redirect('/');
            }
        }
    });
};

module.exports.logOut = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                throw err
            }
            res.redirect('/');
        });
    }
};