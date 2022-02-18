const fooden = require('./api/fooden');
const restaurants = require('./api/restaurant')
const users = require('./api/user')

function routes(app) {
  app.use('/api/fooden', fooden) ;
  app.use('/api/restaurants', restaurants)
  app.use('/api/users', users);
};

module.exports = routes;
