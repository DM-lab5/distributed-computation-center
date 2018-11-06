var winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
    ]
});

const log = async (req, res, next) => {
    logger.info("Elastic logs");
    next();
};

module.exports = log;
