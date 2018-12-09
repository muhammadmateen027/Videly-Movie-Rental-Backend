const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const { Geners, validate } = require('../models/gener');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {
    const movieGeners = await Geners.find().sort('title');
    res.send(movieGeners);
});

router.get(`/:id`, validateObjectId, async (req, res) => {

    const gener = await Geners.findById(req.params.id);
    if (!gener) return res.status(404).send(`Gener with id = ${req.params.id} is not found`);
    res.send(gener);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const schema = new Geners ( {
        name: req.body.name
    });
    await schema.save();
    res.send(schema);

});

router.put(`/:id`, auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const gener = await Geners.findByIdAndUpdate(req.params.id, {title: req.body.title}, {
        new: true
    })
    if (!gener) return res.status(404).send(`Requested ID = ${req.params.id} is not found.`);
    
    res.status(200).send(gener);
});

router.delete(`/:id`, [auth, admin], async (req, res) => {
    // const error = req.params.id;
    // if (error.length === 0) return res.status(400).send(error.details[0].message);

    const gener = await Geners.findByIdAndRemove(req.params.id);
    if (!gener) return res.status(404).send('The gener with the given ID was not found.');

    res.status(200).send(gener);
});


module.exports = router;