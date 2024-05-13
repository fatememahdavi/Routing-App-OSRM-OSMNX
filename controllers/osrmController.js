const osrmService = require('../services/osrmService');


async function getRouteHandler(origin, destination) {
  try {
    const route = await osrmService.getRoute(origin, destination);
    return route;
  } catch (error) {
    throw new Error(`Failed to fetch route from OSRM API ${error}`);
  }
}


module.exports = {
  getRouteHandler,
};