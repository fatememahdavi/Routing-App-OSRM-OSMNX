const express = require('express');
const router = express.Router();
const polyline = require('@mapbox/polyline');
const config = require('config');
const osrmController = require('../controllers/osrmController');


router.post('/', async (req, res) => {

    const { origin, destination } = req.body;

    try {
        const result = await osrmController.getRouteHandler(origin, destination);
        var response = {
            type: 'osrm',
            geometry : polyline.decode(result.routes[0].geometry),
            steps: result.routes[0].legs[0].steps
        }
        res.set('Access-Control-Allow-Origin', config.get('frontBaseUrl'));
        res.send(response);
    }catch (error) {
        res.status(500).json({ error: 'Failed to fetch route'});
    }
});


module.exports = router;