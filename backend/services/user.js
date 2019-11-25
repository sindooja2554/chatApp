 var userModel = require('../app/model/user');

exports.register(req,res,function(err,data){
    if(err)
    {
       return callback(err);
    }
    else if(data)
    {
        userModel.registration();
    }
})

exports.updateDetails(req,res,function(err,data){
    if(err)
        return err
    else if(data)
    {
        userModel.update();
    }
})

exports.Delete(req,res,function(err,data){
    if(err)
        callback(err) 
    else if(data)
    {
        callback(null,data)
        userModel.delete();
    }
})


