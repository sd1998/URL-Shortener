const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = Schema({
  _id: {type: String, required: true},
  long_url: String,
  created_at: Date
});

var Url = mongoose.model('Url',dataSchema);

module.exports = Url;
