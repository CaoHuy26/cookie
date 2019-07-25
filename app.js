const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const Item = require('./models/item.model');
const User = require('./models/user.model');

const validate = require('./validate/user.validate');

mongoose.connect('mongodb://localhost:27017/cookie', { useNewUrlParser: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log('Connect to Mongodb success');

    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', './views')

    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(methodOverride('_method'));

    app.get('/', (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 7;
        const start = (page - 1) * perPage;
        const end = page * perPage;

        Item.find({}).then((items) => {
            res.status(200).render('index',
                {
                    items: items.slice(start, end),
                    length: items.length,
                    perPage: perPage
                });
        });
    });

    app.get('/admin', (req, res) => {
        res.status(200).render('users/admin.ejs');
    });

    app.get('/create-item', (req, res) => {
        res.status(200).render('items/create-item.ejs');
    });

    app.post('/create-item', async (req, res) => {
        const newItem = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
        };

        const result = await Item.create(newItem);
        console.log(result);
        res.status(200).redirect('/');
    });

    app.get('/item', (req, res) => {
        Item.find({}).then((items) => {
            res.status(200).render('items/view-all-item', { items: items });
        });
    });

    app.get('/item/:id', (req, res) => {
        const id = req.params.id;
        Item.findById(id).then((item) => {
            res.status(200).render('items/view-item', { item: item });
        });
    });

    app.delete('/item/:id', (req, res) => {
        const id = req.params.id;

        Item.deleteOne({ _id: id }).then(() => {
            console.log(`Delete ${id} success!!`);
            res.status(200).redirect('/');
        });
    });


    app.get('/login', (req, res) => {
        res.status(200).render('users/login.ejs');
    });

    app.post('/login', (req, res) => {
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

    app.get('/signup', (req, res) => {
        const errMessages = [];
        const values = {
            username: '',
            password: '',
        };
        res.status(200).render('users/signup.ejs', { errMessages: errMessages, values: values });
    });

    app.post('/signup', validate.postCreateUser, (req, res) => {
        const newUser = {
            username: req.body.username,
            password: req.body.password
        };
        console.log(newUser);
        User.create(newUser);
        res.status(200).redirect('/');
    });

    app.listen(3000, (err) => {
        if (err) {
            throw err;
        }
        console.log('Sever listening on port 3000....');
    });
});

