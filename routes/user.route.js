const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');
const multer = require('../middleware/multer')

router.get('/edit', controller.getEdit);

router.get('/:id', controller.getUser)

router.put('/:id', multer.single('avatar'), controller.updateUserById);

router.delete('/:id', controller.deleteUserById);

module.exports = router;