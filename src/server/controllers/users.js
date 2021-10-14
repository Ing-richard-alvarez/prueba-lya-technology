import { httpError } from '../helpers/handleError';

const userModel = require('../models/users');

const getAllUsers = async ( req, res ) => {
    try {
        const allUsers = await userModel.find({});
        res.send({ list: allUsers });
    } catch (error) {
        httpError(res,error);
    }
}

const getUser = async ( req, res ) => {
    const { id }  = req.params;
    const query = {
        estado: true
    }

    if( id == "" ) {
        res.status(500);
        res.send({ error: "id no valido!!"});
    }

    try {
        
        const user = await userModel.findById(id);

        res.json({user});

    } catch (err) {
        httpError(res,err);
    }
}

const createUser = async ( req, res ) => {
    
    console.log(req);

    try {
        const { firstName, lastName, age, address, email, estado, active, password } = req.body;
        const saltRounds = 10;
        const { generateHashPassword } = require('../helpers/handlePassword');
        const passwordHashed =  generateHashPassword(saltRounds,password);

        const resDetail = await userModel.create({
            firstName, 
            lastName, 
            age, 
            address, 
            email,
            estado, 
            active,
            password: passwordHashed
        });
        res.send({ data: resDetail });
    } catch (error) {
        httpError(res,error);
    }
}

const activeUser = async ( req, res ) => {
    const { id } = req.params;
    const filter = { _id: id };
    const update = { active: true };
    
    try {

       let user = await userModel.findOneAndUpdate( filter, update, {
           new: true
       });
       
       if ( user !== null ) {
            res.status(200);
            res.send({ user: user });
        }

    } catch (err) {
        httpError(res,err);
    }

}

const updateUser = async ( req, res ) => {
    const { id } = req.params;
    const { firstName, lastName, age, address, email, estado, active, password } = req.body;
    const filter = { _id: id };
    const update = { firstName, lastName, age, address, email, estado, active, password };
    
    try {

       let user = await userModel.findOneAndUpdate( filter, update, {
           new: true
       });
       
       if ( user !== null ) {
            res.status(200);
            res.send({ user: user });
        }

    } catch (err) {
        httpError(res,err);
    }
}

const deleteUser = async ( req, res ) => {
    const { id } = req.params;
    const filter = { _id: id };
    const update = { estado: false };
    
    try {

       let user = await userModel.findOneAndUpdate( filter, update, {
           new: true
       });
       
       if ( user !== null ) {
            res.status(200);
            res.send({});
        }

    } catch (err) {
        httpError(res,err);
    }
}

module.exports = { getAllUsers, getUser, createUser, activeUser, updateUser, deleteUser };