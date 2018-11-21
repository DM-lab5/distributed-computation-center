const ELASTIC_DEFAULTS = require("../config/kibana.json");

function defaultResponseHandler({res, req, data , logger}) {
    const logData = {...ELASTIC_DEFAULTS.logger, endPoint: req.originalUrl || req.url, status:200, ...data };
    logger.info(logData);
    res.setHeader('Content-Type', 'application/json');
    res.send({ data });
};

function defaultErrorHandler({res, req, data , logger}) {
    const logData = {...ELASTIC_DEFAULTS.logger, endPoint: req.originalUrl || req.url, status: req.status || 500, ...data };
    logger.info(logData);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify((data)));
};

module.exports = {
    defaultResponseHandler,
    defaultErrorHandler,
}
