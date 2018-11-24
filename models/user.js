const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 1024,
        required: true
    }
});
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, name: this.name }, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User', userSchema);

const userValidator = (userObj) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(userObj, schema);
}


module.exports.User = User;
exports.validate = userValidator;