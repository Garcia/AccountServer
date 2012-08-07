function make(schema, mongo) {
  var EmailSchema = new schema({
    mail: { type: String }
  });

  var UserSchema = new schema({
    user: { type: String },
    pass: { type: String },
    fullname: { type: String },
    emails: [EmailSchema]
  });

  return {
    Email: mongo.model('Email', EmailSchema), 
    User: mongo.model('User', UserSchema)
  };
}

module.exports.make = make;
