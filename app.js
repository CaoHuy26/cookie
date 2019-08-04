const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const sharedsesssion = require('express-socket.io-session');

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
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    // View engine
    app.set('view engine', 'ejs');
    app.set('views', './views')

    // Middleware
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(methodOverride('_method'));
    const session = expressSession({
        secret: 'Con cat',
        resave: false,
        saveUninitialized: true
    });
    app.use(session);
    
    //Session
    app.use((req, res, next) => {
        res.locals.userSession = req.session.userSession;
        next();
    });

    // Route
    app.use('/', indexRoute);
    app.use('/', authRoute);
    app.use('/admin', (req, res, next) => {
        const user = req.session.userSession;
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

    // Socketio
    app.get('/chat', (req, res) => {
        res.status(200).render('chat/chat.ejs');
    });

    io.use(sharedsesssion(session, {
        autoSave: true
    }));

    io.on('connection', (socket) => {
        socket.on('login', (userdata) => {
            socket.handshake.session.userdata = userdata;
            socket.handshake.session.save();
        });
        socket.on('logout', (userdata) => {
            if (socket.handshake.session.userdata) {
                delete socket.handshake.session.userdata;
                socket.handshake.session.save();
            }
        });
        // Thông tin của người dùng sẽ được lưu trong: socket.handshake.session.userSession
        
        // Send to userself: socket.emit
        // Send to the others: socket.broadcast.emit
        // Send to all: io.sockets.emit
        console.log(`${socket.id} đã kết nối`);
        socket.on('send message', (data) => {
            if (socket.handshake.session.userSession) {
                const message = {
                    'user': socket.handshake.session.userSession.username,
                    'content': data
                };
                io.sockets.emit('send message', message);
            } else {
                const message = {
                    'user': 'Khách',
                    'content': data
                };
                io.sockets.emit('send message', message);
            }
        });


    });

    server.listen(3000, (err) => {
        if (err) {
            throw err;
        }
        console.log('Sever listening on port 3000....');
    });
});

