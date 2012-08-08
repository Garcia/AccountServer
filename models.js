function make(schema, mongo) {

  var EmailModel = new schema({
    owner: { type: String },
    mail: { type: String }
  });

  var PhoneModel = new schema({
    owner: { type: String },
    area: { type: Number },
    number: { type: Number }
  });

  var AddressModel = new schema({
    owner: { type: String },
    street: { type: String },
    number: { type: String },
    district: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    cep: { type: String }
  });

  var CreditCardModel = new schema({
    owner: { type: String },
    number: { type: Number },
    security_number: { type: Number },
    valid: { type: Date }
  });

  var UserModel = new schema({
    user: { type: String },
    pass: { type: String },
    fullname: { type: String },
    birthdate: { type: Date }
  });

  return {
    Email: mongo.model('Email', EmailModel),
    Phone: mongo.model('Phone', PhoneModel),
    Address: mongo.model('Address', AddressModel),
    CreditCard: mongo.model('CreditCard', CreditCardModel),
    User: mongo.model('User', UserModel)
  };
}

module.exports.make = make;

