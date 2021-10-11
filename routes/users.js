var express = require('express');
var router = express.Router();
const { getAllUsers, getUser, createUser, updateUser, activeUser } = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.patch('/:id/active',activeUser);

router.delete('/:id');

module.exports = router;
