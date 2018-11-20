const mongoose = require('mongoose');
const Joi = require('joi');


const Customers = mongoose.model('customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        maxlength: 12,
        minlength: 3
    }
}));

const customerValidator = (customerObj) => {
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).max(12)
    }

    return Joi.validate(customerObj, schema);
}

module.exports.Customers = Customers;
exports.validate = customerValidator;