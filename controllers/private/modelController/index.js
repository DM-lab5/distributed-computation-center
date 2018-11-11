const { _published } = require('../../../core/publisher/index');
const { defaultErrorHandler } = require('../../../output');
const CONTROLLER = {};


CONTROLLER.callRead = async function(req, res, {model,key}){
    try{
        if(typeof _published[model][key] === 'function'){
            return _published[model][key]();
        }else{
            const resp =  await _published[model].fetch();
            return { [key]: resp[key] };
        }
    } catch(err){
        defaultErrorHandler({req, res, data: {error:"INVALID_READ_REQUEST", message : err.message} });
    }
}

CONTROLLER.callWrite = function(req, res, {model,key}){
    try{
        const {args} = req.body;
        return _published[model][key](...args);
    } catch(err){
        defaultErrorHandler({req, res, data: {error:"INVALID_WRITE_REQUEST", message : err.message} });
    }
}

module.exports = CONTROLLER;
