const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/admin.controller');

const multer = require('../middleware/multer');

// Route
router.get('/', controller.index);

router.get('/create/image', controller.getCreateItem);

router.post('/create/image', multer.single('imageContent'), controller.postCreateItem);

router.get('/view/images', controller.viewItems);

router.get('/view/item/:id', controller.viewItemById);

router.delete('/view/item/:id', controller.deleteItemById);

module.exports = router;