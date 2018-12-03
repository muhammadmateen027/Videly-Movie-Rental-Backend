const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');


module.exports = function() {
    winston.handleExceptions(new winston.transports.File ({ filename: 'uncaughtexceptions.log' }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    // winston.add(winston.transports.MongoDB, { 
    //     db: 'mongodb://localhost/videly',
    //     level: 'info'
    // });


    // throw new Error('Something failed during startup.'); // Sync error
    // const p = Promise.reject(new Error('Something Failed miserably!')); // Async error
    // p.then(() => console.log('Done.'));
}