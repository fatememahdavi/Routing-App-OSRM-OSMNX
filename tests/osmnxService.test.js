const { spawn } = require('child_process');
const { getRoute } = require('../services/osmnxService');
const expectData = require('./data/osmnxServiceExpect');

jest.mock('child_process');


describe('OSMNX Service Test', () => {

  test('should check the route result of OSMNX getRout service', async () => {
    const origin = expectData.origin;
    const destination = expectData.destination;

    const mockProcess = {
      stdout: {
        on: jest.fn().mockImplementationOnce((event, callback) => {
          callback(JSON.stringify(expectData.osmnxRoute));
        }),
      },
      stderr: {
        on: jest.fn().mockImplementationOnce((event, callback) => {}),
      },
      on: jest.fn().mockImplementationOnce((event, callback) => {
        if (event === 'close') {
          callback(0);
        }
      }),
    };

    spawn.mockReturnValueOnce(mockProcess);

    const result = await getRoute(origin, destination);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toEqual(expectData.osmnxRoute.length);

    result.forEach((node) => {
      expect(Array.isArray(node)).toBe(true);
      expect(node.length).toBe(2);
      expect(typeof node[0]).toBe('number');
      expect(typeof node[1]).toBe('number');
    });
  }, 20000);
  
});