var express = require('express');
var router = express.Router();
const { getAllUsers, getUser, createUser, updateUser, activeUser, deleteUser } = require('../controllers/users');
const { checkAuth } = require('../middleware/auth');

router.get('/', checkAuth, getAllUsers);

router.get('/:id', checkAuth, getUser);

router.post('/', createUser);

router.put('/:id', checkAuth, updateUser);

router.patch('/:id/active', checkAuth, activeUser);

router.delete('/:id', checkAuth, deleteUser);

module.exports = router;
