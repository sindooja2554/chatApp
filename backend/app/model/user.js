const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const userDetails = require('../../services/user')
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },

},
    {
        timestamps: true

    });
var User = mongoose.model('User', UserSchema);

//hashing a password before saving it to the database
function encrptyPassword(password, callback) {
    bcrypt.hash(password, 10, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            callback(null, data);
        }

    })
}


module.exports = {
    //adding new user
    registration: (req, callback) => {
        try {
            console.log(req.email)
            User.findOne({ "email": req.email }, (err, data) => {
                console.log(data);
                if (err) {
                    console.log(err)
                }
                // else if (data.email.length > 0) {
                //     console.log('Email already exist');
                // }
                else {
                    encrptyPassword(req.password, (err, encryptedPassword) => {
                        if (err) {
                            return callback(err + "Encryption failed");
                        }
                        else {
                            console.log(encryptedPassword)
                            console.log("\n\n\tAfter encryption Password :" + encryptedPassword);
                            // convert data object into json format to save into schema
                            const createUser = new User({
                                "firstName": req.firstName,
                                "lastName": req.lastName,
                                "password": encryptedPassword,
                                "email": req.email
                            })

                            createUser.save((err, data) => {
                                if (err) {
                                    return callback(err)
                                }
                                else {
                                    console.log('Registration successfull' + data.firstName);
                                    return callback(null, data)
                                }
                            })
                        }
                    })
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    },

    Userlogin: (req, callback) => {

        try {
            //authenticating input using database
            User.findOne({ "email": req.email }, (err, data) => {
                if (err) {
                    console.log('Error finding the email of the user');
                    return callback(err)
                }
                else {

                    if (data.password.length > 0) {

                        console.log('Email found');
                        console.log(req.password)

                        bcrypt.compare(req.password, data.password, (err, result) => {
                            if (err) {

                                return callback(err);
                            }
                            else {

                                if (result) {
                                    console.log('User Found' + data);
                                    return callback(null, data);
                                } else {
                                    return callback(null, 'Password not matched');
                                }
                            }
                        })

                    }

                }
            })
        }
        catch (err) {
            console.log(err)
        }
    },

    //forgot password api
    forgotPassword: (req, callback) => {
        try {
            User.findOne({ "email": req.email }, (err, data) => {
                if (err) {
                    return callback(err);
                } else {
                    if (data.email.length <= 0) {
                        console.log('Email not matched');
                        return callback(null, data);
                    } else {
                        console.log('Your email matched');
                        return callback(null, data);
                    }
                }

            })
        }
        catch (err) {
            console.log(err)
        }

    },

    //reset password api
    reserPassword: (req, callback) => {
        try {
            encrptyPassword(req.password, (err, encryptedPassword) => {

                if (err) {
                    return callback(err)
                } else {
                    console.log(req.id)
                    User.findOneAndUpdate({ '_id': req.id }, { 'password': encryptedPassword }
                        , (err, success) => {
                            if (err) {
                                return callback(err + " update password error")
                            } else {
                                console.log('Changed password succesfully');
                                console.log("in model" + success)
                                return callback(null, success);
                            }
                        })
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    },

    //retriving all user details
    allUserDetails: (req, callback) => {
        try {
            //console.log(req)
            User.find({}, (err, data) => {
                if (err) {
                    return callback(err)
                }
                else {
                    console.log(data)
                    return callback(null, data);
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    },

}