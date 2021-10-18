import express from 'express';

var router = express.Router();
const { login, logout } = require('../controllers/authorization');

/** 
 * @swagger
 * /api/v1/authorization:
 *  post:
 *      tags:
 *      - "Authorization"
 *      summary: Login
 *      description: ""
 *      operationId: "loginUser"
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: "email"
 *        in: "query"
 *        description: "the email for login"
 *        required: true
 *        type: "string"
 *      - name: "password"
 *        in: "query"
 *        description: "The password for login"
 *        required: true
 *        type: "string"
 *        schema: 
 *           $ref: "#/definitions/User"
 *      responses:
 *        200:
 *          description: OK
*/
router.post('/',login);

/** 
 * @swagger
 * /api/v1/authorization:
 *  delete:
 *      tags:
 *      - "Authorization"
 *      summary: Logout
 *      description: ""
 *      operationId: "logoutUser"
 *      produces:
 *      - application/json
 *      parameters: []
 *      responses:
 *        200:
 *          description: OK
*/
router.delete('/',logout);

module.exports = router;