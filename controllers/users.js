const { httpError } = require('../helpers/handleError');
const userModel = require('../models/users');

const getAllUsers = async ( req, res ) => {
    try {
        const allUsers = await userModel.find({});
        res.send({ list: allUsers });
    } catch (error) {
        httpError(res,error);
    }
}

const getUser = ( req, res ) => {

}

const createUser = async ( req, res ) => {
    try {
        const { firstName, lastName, age, address, email, active, password } = req.body;
        const resDetail = await userModel.create({
            firstName, 
            lastName, 
            age, 
            address, 
            email, 
            active,
            password
        });
        res.send({ data: resDetail });
    } catch (error) {
        httpError(res,error);
    }
}

const activeUser = ( req, res ) => {

}

const updateUser = ( req, res ) => {

}

const deleteUser = ( req, res ) => {

}

module.exports = { getAllUsers, getUser, createUser, activeUser, updateUser, deleteUser };