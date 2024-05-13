require('dotenv').config();
const path = require('path');
const { spawn } = require('child_process');
const testConfig = require('../testConfig');
const expectData = require('./data/osmnxServiceExpect');


describe('OSMNX Routing Python Script Test', () => {

  if (testConfig.osmnxServiceAvailable) {

    test('should return the correct osmnx route coordinates from python script', (done) => {
      const locations = [expectData.origin.lng, expectData.origin.lat, expectData.destination.lng, expectData.destination.lat];
      const expectedRoute = expectData.osmnxRoute;

      const pythonScript = path.resolve('osmnxRouting.py')
      const args = [JSON.stringify(locations)];

      const pythonProcess = spawn('python', [pythonScript, ...args]);

      let output = '';

      pythonProcess.stdout.on('data', (data) => {
        const route = data.toString().trim();
        output += route + '\n';
      });

      pythonProcess.stderr.on('data', (data) => {
        const errorMessage = data.toString().trim();
        console.error(errorMessage);
      });

      pythonProcess.on('close', (code) => {
        expect(JSON.parse(output)).toEqual(expectedRoute);
        expect(code).toBe(0);
        done();
      });
    }, 20000);

  }else {

    test.skip('OSRM service is not available', () => {
      // No checks or assertions needed
    });

  }
  
});