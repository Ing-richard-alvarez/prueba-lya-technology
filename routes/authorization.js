var express = require('express');
var router = express.Router();
const { login, logout } = require('../controllers/authorization');

router.post('/',login);
router.delete('/',logout);

module.exports = router;