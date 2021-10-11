const mongoose = require('mongoose');
const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    //console.log(DB_URI);

    try {
        mongoose.connect(DB_URI, {
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASS,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, res) => {
            if(!err) {
                console.log('Conecion a la bd exitosa!!');
            }
        }) 
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { dbConnect }