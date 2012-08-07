var restify = require('restify'),
  mongo = require('mongoose'),
  util = require('util');

mongo.connect('mongodb://localhost/test');

var server = restify.createServer({
  name: 'Account Server'
});

server.use(restify.bodyParser());

// models

var UserModel = new mongo.Schema({
  name: { type: String },
  pass: { type: String },
  fullname: { type: String }
});

var User = mongo.model('User', UserModel);

// server listener's

server.get('/users/:user', function(req, res, next) {
  User.findOne({user: req.params.user}, function (err, doc) {
    if (err) res.send(err);
    else res.send(doc || {});
  });
  return next();
});

server.post('/users', function(req, res, next) {
  var user = new User(req.params);
  user.save(function (err) {
    if(err) res.send(err);
    else res.send(user);
  });
  return next();
});

server.put('/users/:user', function(req, res, next) {
  User.findOne({user: req.params.user}, function (err, doc) {
    if (err) res.send(err);
    else if (doc) {
      doc.fullname = req.params.fullname;
      doc.pass = req.params.pass;
      doc.save(function(err) {
        if(err) res.send(err);
        else res.send(doc);
      });
    } else res.send({});
  });
  return next();
});

server.del('/users/:user', function(req, res, next) {
  User.findOne({user: req.params.user}, function(err, doc) {
    if (err) res.send(err);
    else if (doc) {
      doc.remove(function(err) {
        if(err) res.send(err);
        else res.send(200);
      });
    } else res.send({});
  });
  return next();
});


server.listen(8000);

