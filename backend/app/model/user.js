const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName:{
       type: String,
       required: [true,'firstName is required']
    },
    lastName:{
        type: String,
        required: [true,'lastName is required']
    },
    password:{
        type: String,
        required: [true,'Password is required']
    },
    email:{
        type: String,
        unique: true,
        required: [true,'Email is required']
    },
},
    {
        timestamps: true

});

module.exports = mongoose.model('User', UserSchema);