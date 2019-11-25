const mongoose = require('mongoose');
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
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
},
    {
        timestamps: true

    });
var user = mongoose.model('User', UserSchema);

//hashing a password before saving it to the database
exports.encrpty = (password,callback)=>{
    bcrypt.hash(password, 10, function (err, hash){
      if (err) {
        return err;
      }
      user.password = hash;
      callback();
    })
}

//adding new user
exports.registration = (req, res) => {
    findOne.user({ "email": req.body.email }, (err, data) => {
        if (err) {
            console.log(err)
        }
        else if (data.length > 0) {
            console.log('Email already exist');
        }
        else {
            // Save User in the database
            const createUser = new user({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                email: req.body.email
            })
            createUser.save()
            res.send(data);
        }
    })
};

exports.update = (req, res) => {

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params._ID,{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email
    }, { new: true })
    if({"new":true})
    {
        res.send(user);
    }
}

exports.login=(req,res) => {
    //authenticate input against database
    User.findOne({ "email": req.body.email },(err,data)=>{
        if(data){
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                  return callback(null, user);
                } else {
                  return callback();
                }
            })
        }

    })
}

//retriving all user details
exports.display=(req,res) => {
    user.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};



exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params._ID)
        .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params._ID
            });
        }
        res.send({ message: "User deleted successfully!" });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params._ID
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params._ID
        });
    });
};
