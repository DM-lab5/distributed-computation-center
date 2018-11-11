const redis = require('../../redis-client/index');

class Users {
    async create(key, value){
        const json = await redis.setAsync(key,JSON.stringify(value));
        return json;
    }

    async get(key){
        const json = await redis.getAsync(key);
        return JSON.parse(json);
    }
}

module.exports = new Users();
