const { verifyToken } = require("../helpers/generateToken");

const checkAuth = async ( req, res, next ) => {
    console.log(req.headers.authorization);
    try {
        let token = "";
        let tokenData = "";

        if (req.headers.authorization !== undefined ) {
            token = req.headers.authorization.split(' ').pop();      
            tokenData = await verifyToken(token);
        }
        
        //console.log('tokendata ',tokenData);
        
        if(
            tokenData !== null &&
            tokenData._id &&
            tokenData._id !== null
        )  {
            next();
        } else {
            res.status(409);
            res.send({error: "You don't have enought permission"});
        }
    } catch (err) {
        console.log(err)
    }
    
}

module.exports = { checkAuth };