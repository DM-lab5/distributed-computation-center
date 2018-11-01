const {INTERNAL_AUTH_KEY_LEVEL_1, INTERNAL_AUTH_KEY_LEVEL_2,} = require('../../../config/');

const authenticate = async (req, res, next) => {
    try {
        next();
        // const key1 = req.get('intKeyLevel1');
        // const key2 = req.get('intKeyLevel2');
        // if( key1 === INTERNAL_AUTH_KEY_LEVEL_1 && key2 === INTERNAL_AUTH_KEY_LEVEL_2 ){
        //     next();
        // }else{
        //     throw new Error();
        // }
    } catch (error) {
        res.send(401, {"error":"INTERNAL_AUTHENTICATION_FAILED"});
        next(error);
    }
};

module.exports = authenticate;
