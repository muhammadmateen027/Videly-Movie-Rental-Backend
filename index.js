const showMsg = (msg) => { console.log(msg); }
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const debug = require('debug')('app:startup');
const express = require('express');
const config = require('config');
const geners = require('./routes/geners');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const error = require('./middleware/error')

const app = express();

// this one only works in Sync process rather than Async
// process.on('uncaughtException', (ex) => {
//     console.log('WE GOT AN UNCAUGHT EXCEPTION');
//     winston.error(ex.message, ex);
//     process.exit(1);
// });

winston.handleExceptions(new winston.transports.File ({ filename: 'uncaughtexceptions.log' }));

process.on('unhandledRejection', (ex) => {
    throw ex;
    // console.log('WE GOT AN UNHANDLED REJECTION');
    // winston.error(ex.message, ex);
    // process.exit(1);
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/videly',
    level: 'info'
  });

// throw new Error('Something failed during startup.'); // Sync error
const p = Promise.reject(new Error('Something Failed miserably!')); // Async error
p.then(() => console.log('Done.'));


if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}



mongoose.connect('mongodb://localhost/videly', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err));


app.use(express.json());

app.use('/api/geners', geners);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
debug('This is debugger attached');

// catch error middleware function
app.use(error); // passed only reference of function rather than calling function

const port = process.env.PORT || 3000;
app.listen(port, () => { showMsg(`Listening to port ${port}`) });