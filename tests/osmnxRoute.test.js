const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const osmnxController = require('../controllers/osmnxController');
const expectData = require('./data/osmnxServiceExpect');

const app = express();
app.use(bodyParser.json());

jest.mock('../controllers/osmnxController', () => ({
  getRouteHandler: jest.fn(),
}));

const router = require('../routes/osmnxRoute');
app.use('/routing/osmnx', router);


describe('POST /routing/osmnx', () => {

  test('should return the route successfully', async () => {

    const expectedResult = expectData.osmnxRoute;
    osmnxController.getRouteHandler.mockResolvedValue(expectedResult);

    const origin = expectData.origin;
    const destination = expectData.destination;

    const response = await request(app)
      .post('/routing/osmnx')
      .send({ origin, destination });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      type: 'osmnx',
      geometry: expectedResult,
      steps: [],
    });

  });

  test('should return an error when fetching the route fails', async () => {

    const errorMessage = 'osmnx route error';
    osmnxController.getRouteHandler.mockRejectedValue(new Error(errorMessage));

    const origin = expectData.origin;
    const destination = expectData.destination;

    const response = await request(app)
      .post('/routing/osmnx')
      .send({ origin, destination });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to fetch route' });
  });

});