const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/image.controller');

// Middleware
const multer = require('../middleware/multer')

// Router
router.post('/create', multer.single('imagePath'), controller.postCreate);

router.get('/:id', controller.viewImageById);

router.put('/:id', controller.updateImageById);

router.delete('/:id', controller.deleteImageById);

router.post('/:id/comment', controller.postComment);

module.exports = router;