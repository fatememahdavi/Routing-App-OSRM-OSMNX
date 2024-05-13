const express = require('express');
const config = require('config');
const osmnxController = require('../controllers/osmnxController');

const router = express.Router();

router.post('/', async (req, res) => {

    const { origin, destination } = req.body;

    try {
        const result = await osmnxController.getRouteHandler(origin, destination);
        var response = {
            type: 'osmnx',
            geometry : result,
            steps: [],
        }
        res.set('Access-Control-Allow-Origin', config.get('frontBaseUrl'));
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch route' });
    }
});

module.exports = router;