const envConfigs = require('dotenv');

envConfigs.config({ path: `${__dirname}/../.env` });

const {
    ENCRYPTION_KEY,
} = process.env;

module.exports = {
    ENCRYPTION_KEY
};
