var express = require('express');
var router = express.Router();
const controller = require('../controller/user');
let token = require('../utility/tokenGenerator')

//getting list of users from database
router.post('/login',controller.loginController)


//adding new user to database
router.post('/registration',controller.createUserController)

//update user in database
router.post('/forgetpassword',controller.forgetPasswordController)           //put is taking a parameter id

//updating password in database
router.post('/resetpassword/:id',token.verifyToken,controller.resetPasswordController)


//delete user in database
router.get('/display',controller.allUserDetailsController)


module.exports = router;