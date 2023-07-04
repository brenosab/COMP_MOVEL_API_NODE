const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/info', userController.info);
router.get('/', userController.listUsers);
router.post('/', userController.createUser);
router.get('/:id',userController.getUsers);
router.get('/getUserLogin/:key?',userController.getUserLogin);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;