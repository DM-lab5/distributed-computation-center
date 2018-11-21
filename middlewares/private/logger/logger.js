const elasticsearch = require('elasticsearch');
const { createLogger, format } = require('winston');
const ElasticSearch = require('winston-elasticsearch');
const { ELASTIC_URL, LOGGING } = require('../../../config');

const LEVELS = {
    INFO: 'info',
    ERROR: 'error'
};

const esClient = new elasticsearch.Client({
    host: ELASTIC_URL,
});

const getElasticStyle = format.json(clientInformation => {
    const opts = {
        level: LEVELS.INFO,
        timestamp: new Date().toISOString(),
        meta: clientInformation,
        client,
    };
    return opts;
});

const esTransportOpts = {
    level: LEVELS.INFO,
    timestamp: new Date().toISOString(),
    client: esClient,
};

const transports = [];
if(LOGGING === 1){
    transports.push(new ElasticSearch(esTransportOpts));
}

const logger = createLogger({
    maxsize: 5242880,
    transports
});

module.exports = logger;
