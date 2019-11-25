var express = require('express');
var router = express.Router();
const controller = require('../controller/user');

//getting list of users from database
router.get('/login',function(req,res){
    res.send({type:'GET'});
});

//adding new user to database
router.post('/registration',function(req,res){
    res.send({type: 'POST'});
}); 

//update user in database
router.put('/update/:id',function(req,res){             //put is taking a parameter id
    res.send({type:'PUT'});
});

//delete user in database
router.delete('/delete/:id',function(req,res){            //put is taking a parameter id
    res.send({type:'DELETE'});
});


module.exports = router;