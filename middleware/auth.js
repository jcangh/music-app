'user strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var ResponseUtil = require('../util/responseUtil');

var secret = 'CMS-JCA';

exports.ensureAth = function(req,res,next){
    if (!req.headers.authorization){
        return ResponseUtil.handleNotAuthorized(res,'Auth header not found');
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()){
            return ResponseUtil.handleNotAuthorized(res,'token expired');
        }
    }catch(ex){
        console.log(ex);
        return ResponseUtil.handleNotAuthorized(res,'token not valid');
    }

    req.user = payload;
    next();
}