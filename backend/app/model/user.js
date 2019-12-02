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
            console.log("hash ",data);
            callback(null, data);
        }

    })
}


module.exports = {
    //adding new user
    registration: (req, callback) => {
        try {
            var response={};
            console.log(req.email)
            User.findOne({ "email": req.email }, (err, data) => {
                console.log(data);
                if (err) {
                    console.log(err)
                }
                else if (data) {
                    console.log("data",data.email);
                    /** when email is already present  */
                    console.log("\n\n\t email already exits");
                    response.success = false;
                    response.message = "email already exits"
                    return callback(null, response);
                }
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
                            /** 
                             * @purpose save registration data into schema 
                             * @returns data if schema save successfully
                            */
                            createUser.save((err, data) => {
                                if (err) {
                                    return callback(err)
                                }
                                else {
                                    /* send message to service callback function */
                                    response.success = true;
                                    response.message = "Registration successful";
                                    response.data = data;
                                    console.log('Registration successful ' , data.firstName);
                                    return callback(null, response)
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
            var response={};
            //authenticating input using database
            User.findOne({ "email": req.email }, (err, data) => {
                console.log(data)
                if (err) {
                    console.log('Error finding the email of the user');
                    return callback(err)
                }
                else if (data!==null) {

                        console.log('Email found');
                        console.log(req.password)

                        bcrypt.compare(req.password, data.password, (err, result) => {
                            if (err) {

                                return callback(err);
                            }
                            else {
                                if (result) 
                                {
                                    response.success = true;
                                    response.message = "Yaaa Login Successful ";
                                    response.data = result
                                    return callback(null, response)
                                } else {
                                    response.success=false;
                                    response.message="Password not matched";
                                    return callback(null,response);
                                }
                            }
                        })

                }
                else {
                    console.log("Login failed because Email not registered");
                    response.success = false;
                    response.message = "Login failed because Email not registered";
                    callback(null, response);
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
            var response={}
            User.findOne({ "email": req.email }, (err, data) => {
                console.log(data);
                if (err) {
                    return callback(err);
                } 
                else if (data!==null) {
                    console.log('Your email matched');
                    response.success = true;
                    response.message = " Your Email  matched";
                    response.data=data;
                    console.log("ha",response.data);
                    return callback(null, response);
                }
                else 
                {
                        console.log("Your Email not matched");
                        response.success = false;
                        response.message = " Your Email not matched";                    
                        return callback(null, response)
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
            console.log("req",req.body);
            var response={}
            encrptyPassword(req.password, (err, encryptedPassword) => {

                if (err) {
                    return callback(err)
                } else {
                    console.log(req.id)
                    User.findOneAndUpdate({ '_id': req.id }, { 'password': encryptedPassword }
                        , (err, success) => {
                            if (err) {
                                return callback(err + " update password error")
                            } 
                            else 
                            {
                                console.log('Changed password succesfully');
                                console.log("in model" , success)
                                response.success=true;
                                response.message='Changed password succesfully';
                                return callback(null, response);
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