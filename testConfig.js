module.exports = {
  osrmServiceAvailable: process.env.OSRM_SERVICE === 'true',
  osmnxServiceAvailable: process.env.OSMNX_SERVICE === 'true',
};