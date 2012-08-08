function make(schema, mongo) {
  var EmailModel = new schema({
    mail: { type: String }
  });

  var PhoneModel = new schema({
    area: { type: Number },
    number: { type: Number }
  });

  var AddressModel = new schema({
    street: { type: String },
    number: { type: String },
    district: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    cep: { type: String }
  });

  var CreditCardModel = new schema({
    number: { type: Number },
    security_number: { type: Number },
    valid: { type: Date }
  });

  var UserModel = new schema({
    user: { type: String },
    pass: { type: String },
    fullname: { type: String },
    emails: [EmailModel],
    phones: [PhoneModel],
    address: [AddressModel],
    creditcards: [CreditCardModel]
  });

  return mongo.model('User', UserModel);
}

module.exports.make = make;

