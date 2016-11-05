class Route {
  constructor(method, path, handler, config) {
    this.route = { method, path, handler, config };
  }
  
  getRoute() {
    return this.route;
  }
}

module.exports = Route;
