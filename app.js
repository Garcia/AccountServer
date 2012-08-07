var restify = require('restify');

var server = restify.createServer({
  name: 'Account Server'
});

server.get('/users/:id', function(req, res, next) {
  res.send({name: 'admin', pass: '12345'});
  res
  return next();
});

server.post('/users', function(req, res, next) {
  res.send(req.params.user);
  return next();
});

server.put('/users/:id', function(req, res, next) {
  res.send(req.params.user);
  return next();
});

server.del('/users/:id', function(req, res, next) {
  res.send(200);
  return next();
});

server.listen(8000);

