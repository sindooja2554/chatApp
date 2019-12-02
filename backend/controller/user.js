//const validationResult = require('express-validator');
const jwtTokenGenerator = require('../utility/tokenGenerator');
const mailSender = require('../utility/mailSender');
const userServices = require('../services/user');
module.exports={
    createUserController(request,response)
    {
        // request.checkBody('firstName','Cannot be empty').notEmpty();
        request.checkBody('firstName','First Name Must be at least 3 chars long').isLength({min:3})
        request.checkBody('firstName','First Name Must be only alphabetical chars').isAlpha();

        // request.checkBody('lastName','Cannot be empty').notEmpty();
        request.checkBody('lastName','Last Name Must be at least 3 chars long').isLength({min:3})
        request.checkBody('lastName','Last Name Must be only alphabetical chars').isAlpha();
    
        // request.checkBody('password','Cannot be empty').notEmpty();
        request.checkBody('password','Password Must be at least 8 chars long').isLength({min:8})
        request.checkBody('password','Password contain alphabetical chars and numbers').isAlphanumeric()
    
        // // request.checkBody('email','Cannot be empty').notEmpty()
        request.checkBody('email','Email Must be in email format').isEmail()
        request.checkBody('email','Email Must be at least 30 chars long').isLength({max:30})
        const errors = request.validationErrors();
        console.log(errors);
        
        let res={};
        
        if(errors)
        {
            res.success= false;
            res.message=errors[0].msg;
            res.error = errors;
            return response.status(500).send(res);
        }
        else
        {
            let registrationObject ={
                firstName : request.body.firstName,
                lastName : request.body.lastName,
                password : request.body.password,
                email : request.body.email,
            }

            //call userServices methods and pass the object
            userServices.createUserServices(registrationObject,(err,data)=>{
                if(err)
                {
                    res.success = false,
                    res.err = err
                    return response.status(500).send(res);  //HTTp code 500 - The request was not completed
                }else{
                    console.log("in controller of backend",data.message);
                    res.success=data.success;
                    res.message = data.message;
                    res.data = data;
                    console.log("res in back cont",res);
                    return response.status(200).send(res) //HTTp code 200 - successful response 
                }
            })
        }
    },

    loginController(request,response)
    {
        console.log("controller")
        request.checkBody('email','Email Must be in email format').isEmail()
        request.checkBody('email','Email Must be at least 30 chars long').isLength({max:30})  
        
        request.checkBody('password','Password Must be at least 8 chars long').isLength({min:8})
        request.checkBody('password','Password contain alphabetical chars and numbers').isAlphanumeric()
        let res={};
        const error = request.validationErrors()
        if(error)
        {
            res.success= false;
            res.message=error[0].msg;
            res.error = error;
            return response.status(500).send(res);
        }
        else
        {
            
            let loginObject ={
                email : request.body.email,              
                password : request.body.password,
            }

            //call userServices methods and pass the object
            userServices.loginServices(loginObject,(err,data)=>{
                if(err)
                {                    
                    res.success = false,
                    res.message = data.message,
                    res.err = err
                    return response.status(500).send(res);
                }else{
                    if (data) {
                        let payload = {
                            '_id': data._id,
                            'email': data.email
                        }
                        //get token from jwt
                        let jwtToken = jwtTokenGenerator.generateToken(payload);

                        data.token = jwtToken
                        res.success = data.success,
                        res.message = data.message
                        return response.status(200).send(res)
                    }
                }
            })
        }
    },

    forgetPasswordController(request,response)
    {
        request.checkBody('email','Email Must be in email format').isEmail()
        request.checkBody('email','Email Must be at least 30 chars long').isLength({max:30}) 
        
        let res={};
        const error = request.validationErrors()
        if(error)
        {
            res.success= false;
            res.message=error[0].msg;
            res.error = error;
            console.log(res);
            return response.status(500).send(res);
        }
        else
        {            
            let forgotObject ={
                email : request.body.email,                             
            }

            //call userServices methods and pass the object
            userServices.forgetPasswordService(forgotObject,(err,data)=>{
                console.log("data",data);
                if(err)
                {
                    console.log(err)
                    res.success = false,
                    res.err = err
                    return response.status(500).send(res);
                }
                else if(data.success!==true)
                {
                        res.success=data.success,
                        res.message=data.message
                        return response.status(200).send(res) 
                }
                else
                {
                        console.log(data)
                        let payload = {
                            '_id': data._id
                            // email:data.email
                        }
                        let jwtToken = jwtTokenGenerator.generateToken(payload);
                        //data.token = token;
                        let url = 'http://localhost:3000/#/resetpassword/' + jwtToken.token;
                        mailSender.sendMail(data.data.email, url);
                        res.success=data.success,
                        console.log("else of contrl",res.success)
                        res.message="Link successfully sent to your Email",
                        res.data=data
                        console.log("alpha",data);
                        return response.status(200).send({ res, token: jwtToken.token })
                }
            })
        }
    },

    resetPasswordController(request,response)
    {
        console.log("ctrl",request.body)
        request.checkBody('password','Cannot be empty').notEmpty();
        request.checkBody('password','Must be at least 8 chars long').isLength({min:8})        
        request.checkBody('password','Password contain alphabetical chars and numbers').isAlphanumeric()
        let res={};
        const errors = request.validationErrors()        
        if(errors)
        {
            console.log('err')
            res.success= false;
            res.message=errors[0].msg;
            res.error = errors;
            return response.status(500).send(res);
        }
        else
        {
            let resetObject ={
                password : request.body.password,            
                id: request._id
            }
            console.log("pa",resetObject);
            //call userServices methods and pass the object
            userServices.resetPasswordService(resetObject,(err,data)=>{
                if(err)
                {
                    res.success = false,
                    res.err = err
                    return response.status(500).send(res);
                }
                else
                {
                    res.success=data.success;
                    res.data = data;
                    console.log("response in controller",data);
                    
                    return response.status(200).send(res)
                }
            })
        }     
    },

    allUserDetailsController(request,response)
    {  
        let res={}
        //call userServices methods and pass the object
        userServices.userDetailsService(request, (err, data) => {
            if (err) {
                console.log(err)
                res.success = false,
                    res.err = err
                return response.status(500).send(res);
            } else {
                res.success = data.success;
                res.data = data;
                return response.status(200).send(res)
            }
        })
    }
}