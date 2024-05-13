const axios = require('axios');
const config = require('config');
const expectData = require('./data/osrmServiceExpect');
const { getRoute } = require('../services/osrmService');

jest.mock('axios');


describe('OSRM Service Test', () => {

   test('should check the route result of OSRM getRout service', async () => {
      const origin = expectData.origin;
      const destination = expectData.destination;

      const mockResponse = {data: expectData.osrmResponse};
      axios.get.mockResolvedValue(mockResponse);

      const route = await getRoute(origin, destination);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
         config.get('osrmUrl')
         .replace('{{lng}}', origin.lng.toString())
         .replace('{{lat}}', origin.lat.toString())
         .replace('{{destinationLng}}', destination.lng.toString())
         .replace('{{destinationLat}}', destination.lat.toString())
      );

      expect(route).toEqual(mockResponse.data);
   });
   
});