const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/logging')();
require('./startup/routs')(app); // passed the reference of app
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => { winston.info(`Listening to port ${port}`) });

module.exports = server;