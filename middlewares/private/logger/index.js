const { LOGGING } = require('../../../config');
const logger = require('./logger');

const LEVELS = {
    INFO: 'info',
    ERROR: 'error'
};

const error = (json)=> {
    logger && logger.log(LEVELS.ERROR, json)
};

const info = (json)=> {
    logger && logger.log(LEVELS.INFO, json);
};

module.exports = {
    error,
    info
};
