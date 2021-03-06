const { Customers, validate } = require('../models/customer'); // repeat with .Customer
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
    const customer = await Customers.find().sort('name');
    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customers.findById(req.params.id);
    if(!customer) 
        return res.status(404)
                    .send(`Customer with Id = ${req.params.id} is not found.`);
    res.send(customer);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400)
                    .send(error.details);
    const schema = new Customers ({
        isGold: req.body.isGold,
        name: req.body.name
    });

    await schema.save();

    res.send(schema);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400)
                    .send(error.details);
    const customer = await Customers.findByIdAndUpdate(
        req.params.id, 
        { 
            isGold: req.body.isGold,
            name: req.body.name
        },
        {
            new: true
        }
    );

    if (!customer)
        return res.status(404)
        .send(`Requested ID = ${req.params.id} is not found.`);
    res.status(200).send(customer);
});

router.delete('/:id', auth, async (req, res) => {
    const customer = await Customers.findByIdAndRemove(req.params.id);
    if (!customer)
        return res.status(404)
        .send(`Requested ID = ${req.params.id} is not found.`);
    
        res.status(200).send(customer);
});

module.exports = router;