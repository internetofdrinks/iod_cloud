'use strict';
const hapi = require('hapi');
const logger = require('./utils/logger');

const SERVER_PORT = process.env.REST_PORT || 3000;
const server = new hapi.Server();

class RESTService {

  constructor(routes) {
    server.connection({ port: SERVER_PORT });
    logger.info(`Successfully connected to port: ${SERVER_PORT}`);
    for (const route of routes) {
      server.route(route);
    }
  }

  start() {
    server.start(() => {
      logger.info('Server running at:', server.info.uri);
    });
  }
}

module.exports = RESTService;
