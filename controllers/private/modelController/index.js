const { _published } = require('../../../publisher/index');
const CONTROLLER = {};


CONTROLLER.callRead = async function(req, resp, {model,key}){
    try{
        if(typeof _published[model][key] === 'function'){
            return _published[model][key]();
        }else{
            const resp =  await _published[model].fetch();
            return resp[key];
        }
    } catch(err){
        resp.send({error:"INVALID_READ_REQUEST"})
    }
}

CONTROLLER.callWrite = function(req, resp, {model,key}){
    try{
        const {args} = req.body;
        return _published[model][key](...args);
    } catch(err){
        resp.send({error:"INVALID_WRITE_REQUEST"})
    }
}

module.exports = CONTROLLER;
