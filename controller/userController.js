'use strict'

var User = require('../model/user');
var bcrypt = require('bcrypt-nodejs');
var ResponseUtil = require('../util/responseUtil');
var UserValidator = require('../validator/userValidator');
var jwt = require('../service/jwt');

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

function loginUser(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) =>{
        if (err){
            ResponseUtil.handleError(res,'Request error');
        }else{
            if (!user){
                ResponseUtil.handleNotFound(res,'User not found');
            }else{
                bcrypt.compare(password,user.password, function(err,check){
                    if (check){
                        if (params.gethash){
                            ResponseUtil.handleSuccess(res,jwt.createToken(user));
                        }else{
                            ResponseUtil.handleSuccess(res,user);
                        }
                    }else{
                        ResponseUtil.handleValidationFailed(res,'Wrong user/password');
                    }
                });
            }
        }
    });
}

function test(req,res){
    ResponseUtil.handleSuccess(res,'This is a test');
}

module.exports = {
    saveUser,
    loginUser,
    test
};