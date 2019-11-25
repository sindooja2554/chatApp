// const { check, validationResult } = require('express-validator');
const controller = require('../services/user');

// Validate request
controller(req,res,function(err,data){[
//function register(){
    check('firstName')
    .isEmpty()
    .withmessage('Cannot be empty')
    .isLength({ min: 3 })
    .withmessage('Must be at least 3 chars long')
    .isAlpha()
    .withmessage('Must be only alphabetical chars'),

    check('lastName')
    .isEmpty()
    .withmessage('Cannot be empty')
    .isLength({ min: 3 })
    .withmessage('Must be at least 3 chars long')
    .isAlpha()
    .withmessage('Must be only alphabetical chars'),

    check('password')
    .isEmpty()
    .withmessage('Cannot be empty')
    .isLength({ min: 8})
    .withmessage('Must be at least 8 chars long')
    .isAlphanumeric()
    .withmessage('Must be alphabetical chars and numbers'),

    check('email')
    .isEmpty()
    .withMessage('Cannot be empty')
    .isLength({ min: 30})
    .withMessage('Must be at least 30 chars long')
    .isEmail()
    .withMessage('Must be in email format')
],(req,res)=>{
    const error = validationResult(req)
    if(error.isEmpty()){
        return res.status(422).json({ errors: errors.array() })
    }

}})
module.exports={
    controller
}