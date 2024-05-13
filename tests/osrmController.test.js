const osrmService = require('../services/osrmService');
const { getRouteHandler } = require('../controllers/osrmController');
const expectData = require('./data/osrmServiceExpect');

jest.mock('../services/osrmService');


describe('OSRM Controller Test', () => {

  test('should retrieve the route successfully', async () => {
    osrmService.getRoute.mockResolvedValue(expectData.osrmResponse);

    const origin = expectData.origin;
    const destination = expectData.destination;

    const result = await getRouteHandler(origin, destination);

    expect(result).toEqual(expectData.osrmResponse);
  });

  test('should throw an error when failed to retrieve the route', async () => {

    const errorMessage = 'osrm service error';
    osrmService.getRoute.mockRejectedValue(new Error(errorMessage));

    const origin = expectData.origin;
    const destination = expectData.destination;

    expect.assertions(1);

    try {
      await getRouteHandler(origin, destination);
    } catch (error) {
      expect(error.message).toBe(`Failed to fetch route from OSRM API Error: ${errorMessage}`);
    }
  });
  
});