const envConfigs = require('dotenv');

envConfigs.config({ path: `${__dirname}/../.env` });

const {
    ENCRYPTION_KEY,
    INTERNAL_AUTH_KEY_LEVEL_1,
    INTERNAL_AUTH_KEY_LEVEL_2,
} = process.env;

module.exports = {
    ENCRYPTION_KEY,
    INTERNAL_AUTH_KEY_LEVEL_1,
    INTERNAL_AUTH_KEY_LEVEL_2,
};
