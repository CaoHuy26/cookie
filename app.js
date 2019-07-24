const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const Item = require('./model');

mongoose.connect('mongodb://localhost:27017/cookie', (err) => {
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
        Item.find({}).then((items) => {
            res.status(200).render('index', { items: items });
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

        Item.deleteOne({_id: id}).then(() => {
            console.log(`Delete ${id} success!!`);
            res.status(200).redirect('/');
        });
    });


    app.get('/login', (req, res) => {
        res.status(200).render('users/login.ejs');
    });

    app.get('/signup', (req, res) => {
        res.status(200).render('users/signup.ejs');
    });

    app.listen(3000, (err) => {
        if (err) {
            throw err;
        }
        console.log('Sever listening on port 3000....');
    });

});

