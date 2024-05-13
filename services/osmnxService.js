const { spawn } = require('child_process');
const path = require('path');


function getRoute(origin, destination) {

  const locations = [origin.lng, origin.lat, destination.lng, destination.lat];
  const scriptPath = path.resolve('osmnxRouting.py');
  const args = [JSON.stringify(locations)];

  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', [scriptPath, ...args]);

    let output = '';

    pythonProcess.stdout.on('data', (data) => {
      const message = data.toString().trim();
      output += message;
    });

    pythonProcess.stderr.on('data', (data) => {
      const errorMessage = data? data.toString().trim() : 'error';
      reject(new Error(errorMessage));
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        let result;
        try {
          result = JSON.parse(output);
          resolve(result);
        } catch (error) {
          reject(new Error('Failed to parse output as JSON'));
        }
      } else {
        reject(new Error(`Python process exited with code ${code}`));
      }
    });

    pythonProcess.on('error', (error) => {
      reject(new Error(`An error occurred while executing the Python script: ${error.message}`));
    });
  });
}


module.exports = {
  getRoute,
};