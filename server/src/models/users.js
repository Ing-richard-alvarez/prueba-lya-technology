const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    address: { type:String },
    email: { 
        type: String,
        unique: true 
    },
    estado: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: false
    },
    password: { type: String }
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('users',UserScheme);