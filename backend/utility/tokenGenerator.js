let jwt = require('jsonwebtoken');

module.exports={
    generateToken(payload)
    {
        console.log("2",JSON.stringify(payload))
        let token=jwt.sign(payload,"privateKey",{
            expiresIn:'24h'      //expires in 24 hours
        });

        let object = {
            success : true,
            token : token
        }

        console.log(object)
        return object;
    },

    verifyToken(req,res,next)
    {
        let token = req.headers['token']
        console.log(" token after vread",token);
        
        if(token)
        {
            jwt.verify(token,'privateKey',function (err,decoded){
                console.log(" token in ",token);
                
                // console.log("tkg",data);
                if(err)
                {
                    return res.status(400).send(err+"Token has expired")
                }
                else{
                    console.log("token",JSON.stringify(decoded));
                    // console.log("\nJWT verification result: " + JSON.stringify(data));
                    req.body['data'] = decoded;
               // console.log(req.body);
               req.token = decoded;
               next();
                }
            })
            // return req.decoded;
        }
        else{
            res.status(400).send('Token not received')
        }
    }

}