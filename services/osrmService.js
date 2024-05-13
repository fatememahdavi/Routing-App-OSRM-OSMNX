const axios = require('axios');
const config = require('config');


async function getRoute(origin, destination) {
  try {
    const response = await axios.get(
    config.get('osrmUrl').replace('{{lng}}', origin.lng.toString())
      .replace('{{lat}}', origin.lat.toString())
      .replace('{{destinationLng}}', destination.lng.toString())
      .replace('{{destinationLat}}', destination.lat.toString())
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch route from OSRM API');
  }
}

module.exports = {
  getRoute,
};