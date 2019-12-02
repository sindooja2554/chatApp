var userModel = require('../app/model/user');

module.exports = {
    createUserServices(request, callback) {
        try {
            console.log(request)
            //call model method for saving registration details
            userModel.registration(request, (err, data) => {
                console.log(data);
                if (err) {
                    //send error to controller callback function
                    return callback(err)
                } else {
                    //send data to controller callback function
                    return callback(null, data);
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

    loginServices(request, callback) {
        console.log('inservices')
        try {
            //call model method for save login details
            userModel.Userlogin(request, (err, data) => {
                if (err) {
                    //send error to controller callback function
                    console.log(err)
                    return callback(err)
                }
                else {
                    return callback(null,data)
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    },

    forgetPasswordService(request, callback)          //how to reset password 
    {
        try 
        {
            //call model method for saving forgot password details            
            userModel.forgotPassword(request, (err, data) => {
                if (err) {
                    return callback(err)
                } else {
                    return callback(null,data)
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    },

    resetPasswordService(request, callback) {
        try {
            console.log("in services");
            console.log("aa",request.data);
            //call model method for saving reset password details
            userModel.reserPassword(request, (err, data) => {
                if (err) {
                    //send error to controller callback function
                    return callback(err)
                } else {
                    //send data to controller callback function
                    console.log("services",data)
                    return callback(null, data)
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    },

    userDetailsService(request, callback) {
        try {
            //call model method for saving reset password details
            userModel.allUserDetails(request, (err, data) => {
                if (err) {
                    //send error to controller callback function
                    return callback(err)
                }
                else {

                    return callback(null, data)
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }
}