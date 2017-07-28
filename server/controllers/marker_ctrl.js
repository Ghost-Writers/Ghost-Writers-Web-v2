var Marker = require('../models/marker.js');
var User = require('../models/user.js');

module.exports = {
  index: function(req, res) {
    Marker
      .find({})
      .populate('art')
      .exec(function(err, markers) {
        if (err) return console.log(err)
        res.json({success: true, message: 'all markers', markers: markers})
      })
  },
  show: function(req, res) {
    Marker
      .findOne({_id: req.params.id})
      .populate('art created_by_user_id')
      .exec(function(err, marker) {
        if (err) return console.log(err)
        res.json({success: true, message: 'marker found', marker: marker})
      })
  },
  create: function(req, res) {
    User
      .findOne({_id: req.params.id})
      .exec(function(err, user) {
        if (err) return console.log(err)
        var marker = new Marker(req.body)
        marker.created_by_user_id = user._id;
        marker.save(function(err, marker) {
          if (err) return console.log(err)
            user.markers_created.push(marker)
            user.save(function(err, user) {
              if (err) return console.log(err)
              res.json({success: true, message: 'marker created', marker: marker});
            })
        })
      })
  },
  edit_marker: function(req, res) {
    Marker
      .findOne({_id: req.params.id})
      .exec(function(err, marker) {
        if (err) return console.log(err)
        if (req.body.image_url) {
          marker.image_url = req.body.image_url;
          marker.save(function(err, marker) {
            if (err) return console.log(err)
            res.json({success: true, message: 'marker updated', marker: marker});
          })
        }
      })
  },
  delete_marker: function(req, res) {
    User
      .findOne({_id: req.params.id})
      .exec(function(err, user) {
        if (err) return console.log(err)
        user.markers_created.pull({_id: req.body.marker_id})
        user.save(function(err, user) {
          if (err) return console.log(err)
          Marker
            .findOneAndRemove({_id: req.body.marker_id}, function(err) {
              if (err) return console.log(err)
              res.json({success: true, message: 'marker successfully deleted'})
            })
        })
      })
  }
}