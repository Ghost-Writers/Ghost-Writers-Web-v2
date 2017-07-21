var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artSchema = Schema({
  photo_url: { type: String },
  marker_id: { type: Schema.Types.ObjectId, ref: 'Marker', required: true },
  created_by_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },

  latitude: { type: Number },
  longitude: { type: Number },
  altitude: { type: Number },
  city: { type: String },
  found: [ { type: Schema.Types.ObjectId, ref: 'User' } ] 
})


var Art = mongoose.model('Art', artSchema);

module.exports = Art;