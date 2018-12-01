const express = require('express');
const geners = require('../routes/geners');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
// const debug = require('debug')('app:startup');


module.exports = function (app) {
    app.use(express.json());

    app.use('/api/geners', geners);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    // debug('This is debugger attached');

    // catch error middleware function
    app.use(error); // passed only reference of function rather than calling function
}