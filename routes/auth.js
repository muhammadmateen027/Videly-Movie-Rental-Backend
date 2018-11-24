const { User } = require('../models/user'); // repeat with .Customer
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const router = express.Router();

router.post('/', async (req, res) => {
    
    const { error } = validate(req.body);
    if (error)
        return res.status(400)
                    .send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
});


const validate = (userObj) => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(userObj, schema);
}


module.exports = router;