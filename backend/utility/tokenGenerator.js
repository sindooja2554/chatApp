let jwt = require('jsonwebtoken');

module.exports={
    generateToken(payload)
    {
        console.log("2"+payload)
        let token=jwt.sign(payload,"privateKey",{
            expiresIn:'24h'      //(in sec)expires in 6 hours
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
        let token = req.header('token');
        if(token)
        {
            jwt.verify(token,"privateKey",(err,data)=>{
                if(err)
                {
                    return res.status(400).send(err+"Token has expired")
                }
                else{
                    console.log("token"+JSON.stringify(data));
                    req.decoded = data;
                    next();
                }
            })
            //return req.decoded;
        }
        else{
            res.status(400).send('Token not received')
        }
    }

}