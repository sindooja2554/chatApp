//const validationResult = require('express-validator');

const userServices = require('../services/user');
module.exports={
    createUserController(request,response)
    {
        // request.checkBody('firstName','Cannot be empty').notEmpty();
        request.checkBody('firstName','Must be at least 3 chars long').isLength({min:3})
        request.checkBody('firstName','Must be only alphabetical chars').isAlpha();

        // request.checkBody('lastName','Cannot be empty').notEmpty();
        request.checkBody('lastName','Must be at least 3 chars long').isLength({min:3})
        request.checkBody('lastName','Must be only alphabetical chars').isAlpha();
    
        // request.checkBody('password','Cannot be empty').notEmpty();
        request.checkBody('password','Must be at least 8 chars long').isLength({min:8})
        request.checkBody('password','Must be in between 8  to 12 chars long').isLength({max:12})
        request.checkBody('password','Must be alphabetical chars and numbers').isAlphanumeric('en-US')
    
        // // request.checkBody('email','Cannot be empty').notEmpty()
        request.checkBody('email','Must be in email format').isEmail()
        request.checkBody('email','Must be at least 30 chars long').isLength({max:30})
        const errors = request.validationErrors();
        console.log(errors);
        
        let res={};
        
        if(errors)
        {
            res.success= false;
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
                    return response.status(500).send(res);
                }else{
                    res.success=data.success;
                    res.data = data;
                    return response.status(200).send(res)
                }
            })
        }
    },

    loginController(request,response)
    {
        console.log("controller")
        request.checkBody('email','Cannot be empty').notEmpty()
        request.checkBody('email','Must be in email format').isEmail()
        request.checkBody('email','Must be at least 30 chars long').isLength({max:30})    
        
        request.checkBody('password','Cannot be empty').notEmpty();
        request.checkBody('password','Must be at least 8 chars long').isLength({min:8})
        request.checkBody('password','Must be in between 8  to 12 chars long').isLength({max:12})
        request.checkBody('password','Must be alphabetical chars and numbers').isAlphanumeric('en-US')
        
        let res={};
        const error = request.validationErrors()
        if(error)
        {
            res.success= false;
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
                    res.err = err
                    return response.status(500).send(res);
                }else{
                    res.success=data.success;
                    res.data = data;                    
                    return response.status(200).send(res)
                }
            })
        }
    },

    forgetPasswordController(request,response)
    {
        request.checkBody('email','Cannot be empty').notEmpty()
        request.checkBody('email','Must be in email format').isEmail()
        request.checkBody('email','Must be at least 30 chars long').isLength({max:30})  
        
        let res={};
        const error = request.validationErrors()
        if(error)
        {
            res.success= false;
            res.error = error;
            return response.status(500).send(res);
        }
        else
        {            
            let forgotObject ={
                email : request.body.email,                             
            }

            //call userServices methods and pass the object
            userServices.forgetPasswordService(forgotObject,(err,data)=>{
                if(err)
                {
                    res.success = false,
                    res.err = err
                    return response.status(500).send(res);
                }else{
                    res.success=data.success;
                    res.data = data;
                    return response.status(200).send(res)
                }
            })
        }
    },

    resetPasswordController(request,response)
    {
        request.checkBody('password','Cannot be empty').notEmpty();
        request.checkBody('password','Must be at least 8 chars long').isLength({min:8})
        request.checkBody('password','Must be in between 8  to 12 chars long').isLength({max:12})
        request.checkBody('password','Must be alphabetical chars and numbers').isAlphanumeric('en-US')
        
        let res={};
        const errors = request.validationErrors()        
        if(errors)
        {
            res.success= false;
            res.error = errors;
            return response.status(500).send(res);
        }
        else
        {
            let resetObject ={
                password : request.body.password,
                id: request.decoded._id
            }

            //call userServices methods and pass the object
            userServices.resetPasswordService(resetObject,(err,data)=>{
                if(err)
                {
                    res.success = false,
                    res.err = err
                    return response.status(500).send(res);
                }else{
                    res.success=data.success;
                    res.data = data;
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