const uuidv1 = require('uuid/v1');
const Users = require('../../../dao/private/repository/users');

const CONTROLLER = {};

//TODO need to be stored in database
CONTROLLER.create = async function(req, resp){
    const credentials = {
        apiKey: uuidv1(),
        secretKey: uuidv1(),
        encryptionKey: uuidv1(),
        role: 1
    };

    await Users.create(credentials.apiKey, credentials);
    return credentials;
};

CONTROLLER.get = async function(req, resp, { key }){

    return Users.get( key );
};

module.exports = CONTROLLER;
