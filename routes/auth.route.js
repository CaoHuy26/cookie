const express = require('express');
const router = express.Router();

const validate = require('../validate/user.validate');
const User = require('../models/user.model');

router.get('/login', (req, res) => {
    res.status(200).render('users/login.ejs');
});

router.post('/login', (req, res) => {
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
                res.send('Đăng nhập thành công');
            }
        }
    });
});

router.get('/signup', (req, res) => {
    const errMessages = [];
    const values = {
        username: '',
        password: '',
    };
    res.status(200).render('users/signup.ejs', { errMessages: errMessages, values: values });
});

router.post('/signup', validate.postCreateUser, (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(newUser);
    User.create(newUser);
    res.status(200).redirect('/');
});

module.exports = router;
