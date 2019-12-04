var express = require('express');
var router = express.Router();
const controller = require('../controller/user');
const chatCtrl = require('../controller/chatController');
let token = require('../utility/tokenGenerator')

//getting list of users from database
router.post('/login',controller.loginController)

//adding new user to database
router.post('/registration',controller.createUserController)

//update user in database
router.post('/forgetpassword',controller.forgetPasswordController)      

//updating password in database
router.post('/reset',token.verifyToken,controller.resetPasswordController)

//display user present in database
router.get('/display',controller.allUserDetailsController)

//send message
router.post('/sendmessage',chatCtrl.sendMessageController)

//reseive message
router.get('/receivemessage',chatCtrl.receiveMessageController)

//display user present in database
router.get('/displaychats',chatCtrl.allChatDetailsController)
module.exports = router;