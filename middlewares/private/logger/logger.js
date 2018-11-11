const elasticsearch = require('elasticsearch');
const { createLogger, format } = require('winston');
const ElasticSearch = require('winston-elasticsearch');
const { ELASTIC_URL } = require('../../../config');

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

const logger = createLogger({
    maxsize: 5242880,
    transports: [
        new ElasticSearch(esTransportOpts)
    ]
});

module.exports = logger;
