const polyline = require('@mapbox/polyline');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const osrmController = require('../controllers/osrmController');
const expectData = require('./data/osrmServiceExpect');

const app = express();
app.use(bodyParser.json());

jest.mock('../controllers/osrmController', () => ({
  getRouteHandler: jest.fn(),
}));

const router = require('../routes/osrmRoute');
app.use('/routing/osrm', router);


describe('POST /routing/osrm', () => {

  test('should return the route successfully', async () => {

    osrmController.getRouteHandler.mockResolvedValue(expectData.osrmResponse);

    const origin = expectData.origin;
    const destination = expectData.destination;

    const response = await request(app)
      .post('/routing/osrm')
      .send({ origin, destination });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      type: 'osrm',
      geometry: polyline.decode(expectData.osrmResponse.routes[0].geometry),
      steps: expectData.osrmResponse.routes[0].legs[0].steps,
    });
  });

  test('should return an error when fetching the route fails', async () => {
    const errorMessage = 'osrm route error';
    osrmController.getRouteHandler.mockRejectedValue(new Error(errorMessage));

    const origin = expectData.origin;
    const destination = expectData.destination;

    const response = await request(app)
      .post('/routing/osrm')
      .send({ origin, destination });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to fetch route' });
  });
  
});