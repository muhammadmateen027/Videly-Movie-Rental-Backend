const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const auth = require('../middleware/auth')
const { Customers } = require('../models/customer');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
   
    const customer = await Customers.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!customer) return res.status(400).send('Invalid Movie');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental ({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });


    // rental = await rental.save();
    // movie.numberInStock--;
    // movie.save();
    try{
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        res.send(rental);
    } catch (e){
        res.status(500).send('Something failed..')
    }
});

module.exports = router;