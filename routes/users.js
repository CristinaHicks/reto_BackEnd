const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const auth = require('../middlewares/auth');


router.post('/login', usersController.login);
router.post('/', usersController.post);
router.get('/:id', usersController.get);
router.get('/', usersController.getAll);

module.exports = router; 