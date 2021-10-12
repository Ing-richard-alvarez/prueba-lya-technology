var express = require('express');
var router = express.Router();
const { getAllUsers, getUser, createUser, updateUser, activeUser, deleteUser } = require('../controllers/users');
const { checkAuth } = require('../middleware/auth');
const { validateFields } = require('../middleware/validate-fields');
const { check } = require('express-validator');
const { validateUser } = require('../middleware/validate-user');

router.get('/', checkAuth, getAllUsers);

router.get('/:id',[
    checkAuth,
    check('id','Id no valido para el sistema').isMongoId(),
    validateFields,
    validateUser
], getUser);

router.post('/',createUser);

router.put('/:id', [
    checkAuth,
    check('id','Id no valido para el sistema').isMongoId(),
    validateFields,
    validateUser
], updateUser);

router.patch('/:id/active', [
    checkAuth,
    check('id','Id no valido para el sistema').isMongoId(),
    validateFields,
    validateUser
], activeUser);

router.delete('/:id', [
    checkAuth,
    check('id','Id no valido para el sistema').isMongoId(),
    validateFields,
    validateUser
], deleteUser);

module.exports = router;
