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
 *      tags:
 *      - "Users"
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
 *      tags:
 *      - "Users"
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
 *      tags:
 *      - "Users"
 *      summary: Create a user
 *      description: Create a new user in the system
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "created user object"
 *        required: true
 *        schema: 
 *           $ref: "#/definitions/User"
 *      responses:
 *        200:
 *          description: OK
*/
router.post('/',createUser);
/**
 * @swagger
 * /api/v1/users/{id}:
 *  put:
 *      tags:
 *      - "Users"
 *      summary: update User
 *      description: Update a specific user
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id unique of the user
 *      responses:
 *       200:
 *        schema:
 *          $ref: '#/definitions/User'
 *        type: json
*/
router.put('/:id', [
    checkAuth,
    check('id','Id no valido para el sistema').isMongoId(),
    validateFields,
    validateUser
], updateUser);

/**
 * @swagger
 * /api/v1/users/{id}/active:
 *  patch:
 *      tags:
 *      - "Users"
 *      summary: Active/Inactive User
 *      description: Active/Inactive a  specific user
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id unique of the user
 *      responses:
 *       200:
 *        type: json
*/
router.patch('/:id/active', [
    checkAuth,
    check('id','Id no valido para el sistema').isMongoId(),
    validateFields,
    validateUser
], activeUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *      tags:
 *      - "Users"
 *      summary: Delete User
 *      description: Delete a  specific user
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id unique of the user
 *      responses:
 *       200:
 *        type: json
*/
router.delete('/:id', [
    checkAuth,
    check('id','Id no valido para el sistema').isMongoId(),
    validateFields,
    validateUser
], deleteUser);

module.exports = router;
