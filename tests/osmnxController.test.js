const osmnxService = require('../services/osmnxService');
const { getRouteHandler } = require('../controllers/osmnxController');
const expectData = require('./data/osmnxServiceExpect');


jest.mock('../services/osmnxService');


describe('OSMNX Controller Test', () => {

  test('should retrieve the route successfully', async () => {

    osmnxService.getRoute.mockResolvedValue(expectData.osmnxRoute);

    const origin = expectData.origin;
    const destination = expectData.destination;

    const result = await getRouteHandler(origin, destination);

    expect(result).toEqual(expectData.osmnxRoute);

  });

  test('should throw an error when failed to retrieve the route', async () => {

    const errorMessage = 'osmnx service error';
    osmnxService.getRoute.mockRejectedValue(new Error(errorMessage));

    const origin = expectData.origin;
    const destination = expectData.destination;

    expect.assertions(1);

    try {
      await getRouteHandler(origin, destination);
    } catch (error) {
      expect(error.message).toBe('Failed to retrieve route from OSMNX Error: ' + errorMessage);
    }
  });

});