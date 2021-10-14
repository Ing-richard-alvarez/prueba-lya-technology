const { validationResult } = require('express-validator');


// validaciones de express validator todos los erroes
const validateFields = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    next();
}


module.exports ={validateFields};