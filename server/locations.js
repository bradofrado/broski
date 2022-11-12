const express = require('express');
const mongoose = require('mongoose');

const validUser = require('./users.js').valid;

const router = express.Router();
  

const locationSchema = new mongoose.Schema({
    lat: Number,
    long: Number,
    city: String,
    state: String,
});


const Location = mongoose.model('Location', locationSchema);

/* Endpoints */

router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();

        res.send(locations);
    } catch(ex) {
        console.log(ex);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const location = await Location.findOne({_id: req.params.id});
        if (!location) {
            console.log("Could not find location " + req.params.id);
            return res.status(400).send({
                message: "Could not find location " + req.params.id
            })
        }

        res.send(location);
    } catch(ex) {
        console.log(ex);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    try {
        if (!req.body.lat || !req.body.long || !req.body.city || !req.body.state) {
            console.log("Invalid body parameters");
            return res.status(400).send({
                message: "Invalid body parameters"
            })
        }

        const location = new Location({
            lat: req.body.lat,
            long: req.body.long,
            city: req.body.city,
            state: req.body.state
        });

        await location.save();

        res.send(location);
    } catch(ex) {
        console.log(ex);
        res.sendStatus(500);
    }
});

router.put('/:id', validUser, async (req, res) => {
    try {
        if (!req.body.lat || !req.body.long || !req.body.city || !req.body.state) {
            console.log("Invalid body parameters");
            return res.status(400).send({
                message: "Invalid body parameters"
            })
        }

        const location = await Location.findOne({
            _id: req.params.id
        });

        if (!location) {
            console.log("Cannot find location with id " + req.params.id);
            return res.status(400).send({
                message: "Cannot find location with id " + req.params.id
            })
        }

        location.lat = req.body.lat;
        location.long = req.body.long;
        location.city = req.body.city;
        location.state = req.body.state;

        await location.save();

        res.send(location);
    } catch(ex) {
        console.log(ex);
        res.sendStatus(500);
    }
});

router.delete('/:id', validUser, async (req, res) => {
    try {
        const location = await Location.findOne({
            _id: req.params.id
        });

        if (!location) {
            console.log("Cannot find location with id " + req.params.id);
            return res.status(400).send({
                message: "Cannot find location with id " + req.params.id
            })
        }

        location.isDelete = true;
        await location.save();

        res.send(location);
    } catch(ex) {
        console.log(ex);
        res.sendStatus(500);
    }
})

module.exports = {
    routes: router,
    model: Location
}