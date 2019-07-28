const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Database
const mongoose = require('mongoose');

//Route
const adminRoute = require('./routes/admin.route');
const authRoute = require('./routes/auth.route');
const indexRoute = require('./routes/index.route');

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

    // Route
    app.use('/', indexRoute);
    app.use('/admin', adminRoute);
    app.use('/', authRoute);

    app.listen(3000, (err) => {
        if (err) {
            throw err;
        }
        console.log('Sever listening on port 3000....');
    });
});

