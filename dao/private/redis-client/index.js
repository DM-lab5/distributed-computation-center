const redis = require('redis');
const bluebird = require("bluebird");
const {promisify} = require('util');
const client = redis.createClient(process.env.REDIS_URL);

bluebird.promisifyAll(client);

module.exports = client;
