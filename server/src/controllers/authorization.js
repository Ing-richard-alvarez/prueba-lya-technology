import { verifyPassword } from '../helpers/handlePassword';
import { httpError } from '../helpers/handleError';
import { tokenSign } from '../helpers/generateToken';

const userModel = require('../models/users');


const login =  ( req, res ) => {
    const { email, password } = req.body;
    const self = this;

    try {
        userModel.findOne({ email }, async function(err, user) {
            let checkPassword = false;
            let token = "";

            if(user == null) {
                res.status(500);
                res.send({error: "User not found"});
            }
            
            //verify password
            if(user.password !== "") {
                checkPassword = await verifyPassword(password,user.password);
            }

            if( !checkPassword ) {
                res.status(500);
                res.send({error: "Password incorrect"});
            }

            //create token
            token = await tokenSign(user);

            res.status(200);
            res.send({ token: token});

        });
        
        

    } catch (error) {
        httpError(res,error);
    }
}

const logout = ( req, res ) => {

}

module.exports = { login, logout };