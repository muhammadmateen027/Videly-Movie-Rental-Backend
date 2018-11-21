const showMsg = (msg) => { console.log(msg); }

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const debug = require('debug')('app:startup');
const express = require('express');
const geners = require('./routes/geners');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/videly', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err));


app.use(express.json());

app.use('/api/geners', geners);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
debug('This is debugger attached');

const port = process.env.PORT || 3000;
app.listen(port, () => { showMsg(`Listening to port ${port}`) });