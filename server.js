const express = require('express');
const bodyParser = require('body-parser');


const { createLogger, transports, format } = require('winston');
const Transport = require('winston-transport');
const logform = require('logform');
const expressWinston = require('logform');
const { combine, timestamp, label, printf } = logform.format;


const router = require('./router');
const init = require('./initialization');
const app = express();

app.use(bodyParser.json());
app.use(router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
