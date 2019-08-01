const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/auth.controller');

// Middleware
const validate = require('../validate/user.validate');

// Router
router.get('/signup', controller.getSignUp);

router.post('/signup', validate.postCreateUser, controller.postSignUp);

router.get('/login', controller.getLogIn);

router.post('/login', controller.postLogIn);

router.get('/logout', controller.logOut);

module.exports = router;
