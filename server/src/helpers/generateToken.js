const jwt = require('jsonwebtoken');

const tokenSign = async ( user ) => {
    return jwt.sign(
        {
            _id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2m"
        }
    );
}

const verifyToken = async ( token ) => {
    try {
        return jwt.verify(token,process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
}

module.exports = { tokenSign, verifyToken }