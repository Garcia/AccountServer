function mapResource(server, model, keys, collect, single) {

  function makeOptions(keys, req, res) {
    var options = new Object(), i = 0;
    for (var k in keys) {
      var value = req.params[i] || req.params[keys[k]];
      if (!value) continue;
      options[keys[k]] = value;
      i++;
    }
    return options;
  }

  function fnGetAll(model, keys, req, res, next) {
    model.find(makeOptions(keys, req, res), function (err, docs) {
      if (err) res.send(err);
      else if (!docs) res.send({});
      else res.send(docs)
    });
    return next();
  }

  function fnGet(model, keys, req, res, next) {
    model.findOne(makeOptions(keys, req, res), function (err, instance) {
      if (err) res.send(err);
      else if (!instance) res.send(404, {message: 'Not Found'});
      else res.send(instance);
    });
    return next();
  }

  function fnPost(model, req, res, next) {
    var instance = new model(req.params);
    instance.save(function (err) {
      if(err) res.send(err);
      else res.send(instance);
    });
    return next();
  }

  function fnPut(model, keys, req, res, next) {
    model.findOne(makeOptions(keys, req, res), function (err, instance) {
      if (err) res.send(err);
      else if (instance) {
        for (var k in req.params) {
          if (k != '_id') instance[k] = req.params[k];
        }
        instance.save(function(err) {
          if(err) res.send(err);
          else res.send(instance);
        });
      } else res.send(404, {message: 'Not Fount'});
    });
    return next();
  }

  function fnDel(model, keys, req, res, next) {
    model.findOne(makeOptions(keys, req, res), function(err, instance) {
      if (err) res.send(err);
      else if (instance) {
        instance.remove(function(err) {
          if(err) res.send(err);
          else res.send(200);
        });
      } else res.send(404, {message: 'Not Found'});
    });
    return next();
  }

  server.get(single, function(req, res, next) {
    return fnGet(model, keys , req, res, next);
  });

  server.get(collect, function(req, res, next) {
    return fnGetAll(model, keys, req, res, next);
  });

  server.post(collect, function(req, res, next) {
    return fnPost(model, req, res, next);
  });

  server.put(single, function(req, res, next) {
    return fnPut(model, keys, req, res, next);
  });

  server.del(single, function(req, res, next) {
    return fnDel(model, keys, req, res, next);
  });
}

module.exports.mapResource = mapResource;

