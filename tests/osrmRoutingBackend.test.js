require('dotenv').config();
const axios = require('axios');
const config = require('config');
const testConfig = require('../testConfig');
const expectData = require('./data/osrmServiceExpect');


describe('OSRM Routing Backend Test', () => {

  if (testConfig.osrmServiceAvailable) {

    test('should fetch the route from the OSRM backend', async () => {
      const origin = expectData.origin;
      const destination = expectData.destination;

      const response = await axios.get(
        config.get('osrmUrl')
        .replace('{{lng}}', origin.lng.toString())
        .replace('{{lat}}', origin.lat.toString())
        .replace('{{destinationLng}}', destination.lng.toString())
        .replace('{{destinationLat}}', destination.lat.toString())
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('code', 'Ok');
      expect(response.data).toHaveProperty('routes');
      expect(response.data).toHaveProperty('waypoints');
    });
    
  }else {

    test.skip('OSRM service is not available', () => {
      // No checks or assertions needed
    });

  }

});