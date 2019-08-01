const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/admin.controller');

router.get('/', controller.index);

//ITEM
router.get('/view/images', controller.viewItems);

// USER
router.get('/view/users', controller.viewUsers);

module.exports = router;