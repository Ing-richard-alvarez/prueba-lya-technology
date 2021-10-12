const bcrypt = require('bcrypt');

const generateHashPassword = (saltRounds,password) => {
    
    console.log(saltRounds);
    console.log(password);
    
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    
    return hash;
}

module.exports = { generateHashPassword };