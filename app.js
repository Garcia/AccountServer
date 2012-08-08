var restify = require('restify'),
  mongo = require('mongoose'),
  db = mongo.connect('mongodb://localhost/account_server'),
  schema = mongo.Schema,
  objectid = schema.ObjectId,
  route = require('./controller'),
  models = require('./models').make(schema, mongo),
  Email = models.Email,
  Phone = models.Phone,
  Address = models.Address,
  CreditCard = models.CreditCard,
  User = models.User,
  util = require('util');

// server config & listener's

var server = restify.createServer({
  name: 'Account Server'
});

server.use(restify.bodyParser());

route.fn_resource(server, User, ['user'], '/users', '/users/:user');

route.fn_resource(server, Email, ['owner', 'mail'],
  /^\/users\/(.+)\/emails/, /^\/users\/(.+)\/emails\/(.+)/);

route.fn_resource(server, Phone, ['owner', 'area', 'number'],
  /^\/users\/(.+)\/phones/, /^\/users\/(.+)\/phones\/(.+)\/(.+)/);

route.fn_resource(server, Address, ['owner', '_id'],
  /^\/users\/(.+)\/address/, /^\/users\/(.+)\/address\/(.+)/);

route.fn_resource(server, CreditCard, ['owner', 'number'],
  /^\/users\/(.+)\/creditcards/, /^\/users\/(.+)\/creditcards\/(.+)/);

server.listen((process.env['APP_PORT'] || 8000));

