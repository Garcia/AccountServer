var restify = require('restify'),
  mongo = require('mongoose'),
  db = mongo.connect('mongodb://localhost/account_server'),
  Schema = mongo.Schema,
  ObjectId = Schema.ObjectId,
  Models = require('./models').make(Schema, mongo),
  Email = Models.Email,
  User = Models.User,
  util = require('util');

var server = restify.createServer({
  name: 'Account Server'
});

// functions to manage model's

function fn_get(model, key, req, res, next) {
  var options = new Object();
  options[key] = req.params[key];
  model.findOne(options, function (err, instance) {
    if (err) res.send(err);
    else if (!instance) res.send(404, {title: 'Not Found'});
    else res.send(instance);
  });
  return next();
}

function fn_post(model, req, res, next) {
  var instance = new model(req.params);
  instance.save(function (err) {
    if(err) res.send(err);
    else res.send(instance);
  });
  return next();
}

function fn_put(model, key, req, res, next) {
  var options = new Object();
  options[key] = req.params[key];
  model.findOne(options, function (err, instance) {
    if (err) res.send(err);
    else if (instance) {
      for (var k in req.params) {
        if (k != '_id' && k != key) instance[k] = req.params[k];
      }
      instance.save(function(err) {
        if(err) res.send(err);
        else res.send(instance);
      });
    } else res.send({});
  });
  return next();
}

function fn_del(model, key, req, res, next) {
  var options = new Object();
  options[key] = req.params[key];
  User.findOne(options, function(err, instance) {
    if (err) res.send(err);
    else if (instance) {
      instance.remove(function(err) {
        if(err) res.send(err);
        else res.send(200);
      });
    } else res.send(404, {title: 'Not Found'});
  });
  return next();
}

// server config & listener's

server.use(restify.bodyParser());

server.get('/users/:user', function(req, res, next) {
  return fn_get(User, 'user', req, res, next);
});

server.post('/users', function(req, res, next) {
  return fn_post(User, req, res, next);
});

server.put('/users/:user', function(req, res, next) {
  return fn_put(User, 'user', req, res, next);
});

server.del('/users/:user', function(req, res, next) {
  return fn_del(User, 'user', req, res, next);
});

server.listen(8000);

