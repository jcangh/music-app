'use strict'

var User = require('../model/user');
var bcrypt = require('bcrypt-nodejs');
var ResponseUtil = require('../util/responseUtil');
var UserValidator = require('../validator/userValidator');

function saveUser(req, res){
    var user = new User();

    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    let validationErrors = UserValidator.validateUser(params);

    if (validationErrors != null){
        ResponseUtil.handleValidationFailed(res,validationErrors);
    }else{
        bcrypt.hash(params.password,null,null, function(err,hash){
            
            user.password = hash;

            user.save((err, userSaved) =>{
                if (err){
                    ResponseUtil.handleError(res,'Error saving user');
                }else{
                    if (!userSaved){
                        ResponseUtil.handleNotFound(res,'User not saved');
                    }else{
                        ResponseUtil.handleCreated(res,userSaved);
                    }
                }
            })
            
        });
    }
}

module.exports = {
    saveUser
};