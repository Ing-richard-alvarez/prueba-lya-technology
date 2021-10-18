import express from 'express';
var router = express.Router();
const { getAllUsers, getUser, createUser, updateUser, activeUser, deleteUser } = require('../controllers/users');
const { checkAuth } = require('../middleware/auth');
const { validateFields } = require('../middleware/validate-fields');
const { check } = require('express-validator');
const { validateUser } = require('../middleware/validate-user');
/**
 * @swagger
 * /api/v1/users:
 *  get:
 *      summary: Get All Users
 *      description: Get all users registered at the database
 *      produces:
 *          - application/json
 *      responses:
 *       200:
 *        schema:
 *        type: json
*/
router.get('/', checkAuth, getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *      summary: Get User
 *      description: Get a specific user
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id unique of the user
 *      responses:
 *       200:
 *        schema:
 *        type: json
*/
router.get('/:id',[
    checkAuth,
    check('id','Id no valido para el sistema').isMongoId(),
    validateFields,
    validateUser
], getUser);

/** 
 * @swagger
 * definitions:
 *  User:
 *      type: object
 *      properties:
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          age:
 *              type: integer
 *          address:
 *              type: string
 *          email:
 *              type: string
 *          estado:
 *              type: boolean
 *          active:
 *              type: boolean
 *          password:
 *              type: string 
*/
/** 
 * @swagger
 * /api/v1/users:
 *  post:
 *      summary: Create a user
 *      requestBody:
 *          content:
 *              application/json:
 *              schema:
 *                  $ref: '#/definitions/User'
*/
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
