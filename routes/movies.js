const { Movie, validate } = require('../models/movie')
const { Geners } = require('../models/gener');
const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.get(`/:id`, async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send(`The movie with the given id = ${req.params.id} is not found`);
    res.send(movie);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const gener = await Geners.findById(req.body.generId);
    if (!gener) return res.status(400).send('Invalid genre.');

    const schema = new Movie ( {
        title: req.body.title,
        gener: {
            _id: gener._id,
            name: gener.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await schema.save();
    res.send(schema);

});

router.put(`/:id`, auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const gener = await Geners.findById(req.body.generId);
    if (!gener) return res.status(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            gener: {
                _id: gener._id,
                name: gener.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },
        { new: true }
        );
    if (!movie) return res.status(404).send(`The movie with the given ID = ${req.params.id} is not found.`);
    
    res.status(200).send(movie);
});

router.delete(`/:id`, auth, async (req, res) => {
    // const error = req.params.id;
    // if (error.length === 0) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('The gener with the given ID was not found.');

    res.status(200).send(movie);
});


module.exports = router;