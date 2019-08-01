const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');

router.delete('/:id', controller.deleteUserById);

module.exports = router;