const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSession = require('express-session');

// Database
const mongoose = require('mongoose');

//Route
const indexRoute = require('./routes/index.route'); // Trang chủ
const adminRoute = require('./routes/admin.route');
const authRoute = require('./routes/auth.route'); 
const imageRoute = require('./routes/image.route');
const userRoute = require('./routes/user.route');


mongoose.connect('mongodb://localhost:27017/cookie', { useNewUrlParser: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log('Connect to Mongodb success');

    const app = express();

    // View engine
    app.set('view engine', 'ejs');
    app.set('views', './views')

    // Middleware
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(methodOverride('_method'));
    app.use(expressSession({
        secret: 'Con cat',
        resave: false,
        saveUninitialized: true
    }));
    //Session
    app.use((req, res, next) => {
        res.locals.user = req.session.user;
        next();
    });

    // Route
    app.use('/', indexRoute);
    app.use('/', authRoute);
    app.use('/admin', (req, res, next) => {
        const user = req.session.user;
        if (user) {
            if (!user.isAdmin) {
                res.redirect('/');
            }
            next();
        }
        else {
            res.redirect('/');
        }
    }, adminRoute);
    app.use('/image', imageRoute);
    app.use('/user', userRoute); 

    app.listen(3000, (err) => {
        if (err) {
            throw err;
        }
        console.log('Sever listening on port 3000....');
    });
});

