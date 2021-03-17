'use strict'

function handleError(res, messageString){
    res.status(500).send({
        message: messageString
    });
}

function handleValidationFailed(res, messageString){
    res.status(400).send({
        message: messageString
    });
}

function handleCreated(res, resourceCreated){
    res.status(201).send({
        resourceCreated: resourceCreated
    });
}

function handleUpdated(res, resourceUpdated){
    res.status(200).send({
        resourceUpdated: resourceUpdated
    });
}

function handleNotFound(res, messageString){
    res.status(404).send({
        message: messageString
    });
}

module.exports = {
    handleError,
    handleValidationFailed,
    handleCreated,
    handleUpdated,
    handleNotFound
}