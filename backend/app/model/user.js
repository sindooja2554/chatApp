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
    // urlCode: String,
    // longURL: String,
    // shortURL: String,
    // date:{
    //     type: String,
    //     default: Date.now
    // },
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

class userModel
{
    /**
     * @description-This function register user with the app and user data is stored in database
     * @param {} req
     * @param {} callback
     */
    //adding new user
    registration(req, callback) 
    {
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
                    /* when email is already present  */
                    console.log("\n\n\t email already exist");
                    response.success = false;
                    response.message = "email already exist"
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
    }

    /**
     * @description-In this function user logins to the application and then token
     *              is generated, the generated token is then stored in the header
     *              and the token can be used for further operations.
     * @param {} req
     * @param {} callback
     */
    Userlogin(req, callback)
    {

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
                                    response.message = "Yeah Login Successful ";
                                    response.data = result
                                    return callback(null, response)
                                } else 
                                {
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
    }

    /**
     * @description-In this function user request to change the password, to change the password 
     *              user enters the email id registered with the application. If the email id given 
     *              by user is present in database then the reset password link is sent to the email.  
     * @param {} req
     * @param {} callback
     */
    //forgot password api
    forgotPassword(req, callback)  
    {
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

    }

    /**
     * @description-In this function user change the password of the account. The changed 
     *              password is then updated in the database. User can now login using the 
     *              new/changed password.  
     * @param {} req
     * @param {} callback
     */
    //reset password api

    reserPassword(req, callback) 
    {
        try {
            console.log("req",req.body);
            var response={}
            encrptyPassword(req.password, (err, encryptedPassword) => {

                if (err) {
                    return callback(err)
                } else 
                {
                    console.log(req.id)
                    User.findOneAndUpdate({ '_id': req.id }, { 'password': encryptedPassword }
                    , (err, success) => 
                    {
                        if (err) {
                            return callback(err + " update password error")
                        }
                        else {
                            console.log('Changed password succesfully');
                            console.log("in model", success)
                            response.success = true;
                            response.message = 'Changed password succesfully';
                            return callback(null, response);
                        }
                    })
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    //retriving all user details
    getAllUsers(req, callback)  
    {
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
    }

    // urlShortener(request,response)
    // {
    //     try
    //     {
    //         User.findOne({"_id" : request.id},(error , data)=>{
    //             if(error)
    //             {
    //                 return callback(error)
    //             }
    //             else
    //             {
    //                 var response = {};
    //                 const data = {
    //                     "longURL" : request.longURL,
    //                     "shortURL": request.shortURL,
    //                     "urlCode" : request.urlCode,
    //                     "email"   : request.email
    //                 }
    //             }
    //         })
    //     }
    //     catch(error)
    //     {
    //         console.log(error);
    //     }
    // }
}

module.exports= new userModel();