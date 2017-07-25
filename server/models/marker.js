var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var marker_schema = Schema({
  image_url: { type: String },
  art: [ { type: Schema.Types.ObjectId, ref: 'Art' } ],
  created_by_user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  altitude: { type: Number },
  city: { type: String },
})

var Marker = mongoose.model('Marker', marker_schema);

module.exports = Marker;