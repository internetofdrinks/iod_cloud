const hapi = require('hapi');
const Inert = require('inert');
const logger = require('./utils/logger');

// PORT = Heroku Port
const SERVER_PORT = process.env.PORT || 3000;
const server = new hapi.Server();

class RESTService {
  constructor(routes) {
    this.routes = routes;
  }

  start() {
    server.register(Inert, () => {
      server.connection({ port: SERVER_PORT });
      logger.info(`Successfully connected to port: ${SERVER_PORT}`);
      for (const route of this.routes) {
        server.route(route);
      }
      server.start(() => {
        logger.info('Server running at:', server.info.uri);
      });
    });
  }
}

module.exports = RESTService;
