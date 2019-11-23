var express = require('express');
var router = express.Router();
const User = require('../app/model/user')
//getting list of users from database
router.get('/user',function(req,res){
    res.send({type:'GET'});
});

//adding new user to database
router.post('/user',function(req,res){
    User.create(req.body).then(function(user){            //this will create the new instance of user and save it in database   this also return promise
        res.send(user);
    });
}); 

//update user in database
router.put('/user/:id',function(req,res){             //put is taking a parameter id
    res.send({type:'PUT'});
});

//delete user in database
router.delete('/user/:id',function(req,res){             //put is taking a parameter id
    res.send({type:'DELETE'});
});


module.exports = router;