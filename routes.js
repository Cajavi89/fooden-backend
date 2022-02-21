const fooden = require('./api/fooden');
const restaurants = require('./api/restaurant');
const users = require('./api/user');
const uploads = require('./api/uploads');

function routes(app) {
  app.use('/api/fooden', fooden) ;
  app.use('/api/restaurants', restaurants);
  app.use('/api/users', users);
  app.use('/api/uploads', uploads);
};

module.exports = routes;
