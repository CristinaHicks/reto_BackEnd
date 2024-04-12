const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');
const auth = require('../middlewares/auth');
router.use(express.json());

router.get('/getAll', postController.get);
router.get('/:id', postController.getById);
router.post('/', auth.authToken, postController.post);
router.patch('/:id', auth.authToken, postController.patch);
router.delete('/:id', auth.authToken, postController.delete);

module.exports = router;