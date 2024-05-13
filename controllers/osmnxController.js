const osmnxService = require('../services/osmnxService');


async function getRouteHandler(origin, destination) {
  try {
    const route = await osmnxService.getRoute(origin, destination);
    return route;
  } catch (error) {
    throw new Error('Failed to retrieve route from OSMNX '+ error);
  }
}

module.exports = {
  getRouteHandler,
};