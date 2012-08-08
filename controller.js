function fn_resource(server, model, keys, plural, single) {

  function fn_makeOptions(keys, req, res) {
    var options = new Object(), i = 0;
    for (var k in keys) {
      var value = req.params[i] || req.params[keys[k]];
      if (!value) continue;
      options[keys[k]] = value;
      i++;
    }
    return options;
  }

  function fn_getall(model, keys, req, res, next) {
    model.find(fn_makeOptions(keys, req, res), function (err, docs) {
      if (err) res.send(err);
      else if (!docs) res.send({});
      else res.send(docs)
    });
    return next();
  }

  function fn_get(model, keys, req, res, next) {
    model.findOne(fn_makeOptions(keys, req, res), function (err, instance) {
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

  function fn_put(model, keys, req, res, next) {
    model.findOne(fn_makeOptions(keys, req, res), function (err, instance) {
      if (err) res.send(err);
      else if (instance) {
        for (var k in req.params) {
          if (k != '_id') instance[k] = req.params[k];
        }
        instance.save(function(err) {
          if(err) res.send(err);
          else res.send(instance);
        });
      } else res.send(404, {title: 'Not Fount'});
    });
    return next();
  }

  function fn_del(model, keys, req, res, next) {
    model.findOne(fn_makeOptions(keys, req, res), function(err, instance) {
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

  server.get(single, function(req, res, next) {
    return fn_get(model, keys , req, res, next);
  });

  server.get(plural, function(req, res, next) {
    return fn_getall(model, keys, req, res, next);
  });

  server.post(plural, function(req, res, next) {
    return fn_post(model, req, res, next);
  });

  server.put(single, function(req, res, next) {
    return fn_put(model, keys, req, res, next);
  });

  server.del(single, function(req, res, next) {
    return fn_del(model, keys, req, res, next);
  });
}

module.exports.fn_resource = fn_resource;

