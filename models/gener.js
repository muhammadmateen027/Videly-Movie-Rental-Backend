const Joi = require('joi');
const mongoose = require('mongoose');

const generSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Geners = mongoose.model('Gener', generSchema);

const validateGener = (generObj) => {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    }

    return Joi.validate(generObj, schema);
}

exports.generSchema = generSchema;
exports.Geners = Geners;
exports.validate = validateGener;