const { verifyToken } = require("../helpers/generateToken");

const checkAuth = async ( req, res, next ) => {
    try {
        let token = "";
        let tokenData = "";

        if (req.headers.authorization !== undefined ) {
            token = req.headers.authorization.split(' ').pop();
            tokenData = await verifyToken(token);
        }
        
        console.log(tokenData);
        
        if(
            tokenData !== "" &&
            tokenData._id
        )  {
            next();
        } else {
            res.status(409);
            res.send({error: "No estas autorizado para realizar esta funcionalidad"});
        }
    } catch (err) {
        console.log(err)
    }
    
}

module.exports = { checkAuth };