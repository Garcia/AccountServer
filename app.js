var restify = require('restify'),
  util = require('util'),
  mongo = require('mongoose'),
  db = mongo.connect('mongodb://localhost/account_server'),
  schema = mongo.Schema,
  objectid = schema.ObjectId,
  contrl = require('./controller'),
  models = require('./model').mapModels(schema, mongo),
  Email = models.Email,
  Phone = models.Phone,
  Address = models.Address,
  CreditCard = models.CreditCard,
  User = models.User;

// server config & listener's

var server = restify.createServer({
  name: 'Account Server'
});

server.use(restify.bodyParser());

contrl.mapResource(server, User, ['user'], '/users', '/users/:user');

contrl.mapResource(server, Email, ['owner', 'mail'],
  /^\/users\/(.+)\/emails/, /^\/users\/(.+)\/emails\/(.+)/);

contrl.mapResource(server, Phone, ['owner', 'area', 'number'],
  /^\/users\/(.+)\/phones/, /^\/users\/(.+)\/phones\/(.+)\/(.+)/);

contrl.mapResource(server, Address, ['owner', '_id'],
  /^\/users\/(.+)\/address/, /^\/users\/(.+)\/address\/(.+)/);

contrl.mapResource(server, CreditCard, ['owner', 'number'],
  /^\/users\/(.+)\/creditcards/, /^\/users\/(.+)\/creditcards\/(.+)/);

server.listen((process.env['APP_PORT'] || 8000));

