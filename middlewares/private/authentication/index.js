const userController = require('../../../controllers/private/users');


const authenticate = async (req, res, next) => {
    try {
        next();
        // const key = req.get('apiKey');
        // const secretKey = req.get('secretKey');
        // const resp = await  userController.get(req, res, { key });
        // if(resp.secretKey === secretKey){
        //     next();
        // }else{
        //     throw new Error();
        // }
    } catch (error) {
        res.send(401, {"error":"AUTHENTICATION_FAILED"});
        next(error);
    }
};

module.exports = authenticate;
