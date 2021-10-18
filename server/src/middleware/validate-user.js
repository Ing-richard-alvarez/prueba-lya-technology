const moongose = require('mongoose');
const userModel = require('../models/users');
const { request, response } = require('express');

const validateUser = async (req=request, res=response, next) => {
    
    const { id } = req.params;
    const query = { estado: true}
    const user = await userModel.findById(id,query);

    return new Promise((resolve,reject) => {
        if (!user) reject(`El usuario con el id ${id} no existe en la DB`);
        next();
    });

    
}

module.exports = { validateUser };