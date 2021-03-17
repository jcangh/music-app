'use strict'


function validateUser(user){

    if (null == user.name){
        return 'User name is required';
    }

    if (null == user.surname){
        return 'User surname is required';
    }

    if (null == user.email){
        return 'User email is required';
    }

    if (null == user.password){
        return 'User password is required';
    }
}

module.exports = {
    validateUser
}