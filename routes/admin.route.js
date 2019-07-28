const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/admin.controller');

const multer = require('../middleware/multer');

// Route
//ITEM
router.get('/', controller.index);

router.get('/create/image', controller.getCreateItem);

router.post('/create/image', multer.single('imagePath'), controller.postCreateItem);

router.get('/view/images', controller.viewItems);

router.get('/view/image/:id', controller.viewItemById);

router.delete('/view/image/:id', controller.deleteItemById);

// USER
router.get('/view/users', controller.viewUsers);

router.delete('/view/user/:id', controller.deleteUserById);

module.exports = router;