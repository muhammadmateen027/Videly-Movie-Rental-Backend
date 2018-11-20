const mongoose = require('mongoose');
const Joi = require('joi');
const { generSchema } = require('./gener')


const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    gener: {
        type: generSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    
}));

const validate = (movieObj) => {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        generId: Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required(),
    }

    return Joi.validate(movieObj, schema);
}

module.exports.Movie = Movie;
exports.validate = validate;