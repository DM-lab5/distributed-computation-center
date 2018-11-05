const express = require('express');
const bodyParser = require('body-parser');


const { createLogger, transports, format } = require('winston');
const Transport = require('winston-transport');
const logform = require('logform');
const expressWinston = require('logform');
const { combine, timestamp, label, printf } = logform.format;


const router = require('./routes');
const init = require('./initialization');
const logger = require('./middlewares/private/logger');
const app = express();


// const logger = createLogger({
//     format: combine(
//         label({ label: 'right meow!' }),
//         timestamp(),
//         printf(nfo => {
//             return `${nfo.timestamp} [${nfo.label}] ${nfo.level}: ${nfo.message}`;
//         })
//     ),
//     transports: [new transports.Console()]
// });

app.use(logger);
//
// app.use(expressWinston.logger({
//     transports: [
//         new (winston.transports.Logstash)({
//             port: 28777,
//             node_name: 'snapJob',
//             localhost: 'localhost',
//             pid: 12345 ,
//             ssl_enable: false,
//             ca: undefined
//         })
//     ]
// }));
app.use(bodyParser.json());
app.use(router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
