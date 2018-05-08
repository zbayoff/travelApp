const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

exports.findAll = function (req, res) {
  Trip.find({}, function (err, results) {
    return res.send(results);
  });
};

exports.findById = function (req, res) {
  const id = req.params.id;
  Trip.findOne({
    '_id': id
  }, function (err, result) {
    return res.send(result);
  });
};

exports.add = function (req, res) {
  Trip.create(req.body, function (err, trip) {
    if (err) return console.log(err);
    return res.send(trip);
  });
};


exports.update = function (req, res) {
  const id = req.params.id;
  const updates = req.body;

  Trip.update({
      '_id': id
    }, updates,
    function (err) {
      if (err) return console.log(err);
      return res.sendStatus(202);
    });
};


exports.delete = function (req, res) {
  let id = req.params.id
  Trip.remove({
    '_id': id
  }, function (result) {
    return res.send(result)
  })
};

exports.import = function (req, res) {
  // Recipe below refers to the mongoose schema. create() is a mongoose method
  Trip.create({
      'destination': 'Madrid, Spain',
      'cost': 600,
      'startdate': 'May 15',
      'leavedate': 'May 20',
      'image': 'madrid.png',
      'travelCosts': [{
        'plane': 60,
        'car': 25,
        'bus': 45,
        'train': 0,
        'boat': 0,
        'other': 0
      }],
      'lodgingCosts': [{
        'hotel': 60,
        'airBnB': 25,
        'other': 45,
      }],
      'miscCosts': [{
        'fun': 60,
        'other': 45,
      }],
    }, {
      'destination': 'Geneva, Switzerland',
      'cost': 1800,
      'startdate': 'May 15',
      'leavedate': 'May 20',
      'image': 'madrid.png',
      'travelCosts': [{
        'plane': 765,
        'car': 322,
        'bus': 13,
        'train': 0,
        'boat': 0,
        'other': 0
      }],
      'lodgingCosts': [{
        'hotel': 432,
        'airBnB': 45,
        'other': 466,
      }],
      'miscCosts': [{
        'fun': 44,
        'other': 22,
      }],
    }, {
      'destination': 'Rome, Italy',
      'cost': 2000,
      'startdate': 'May 15',
      'leavedate': 'May 20',
      'image': 'madrid.png',
      'travelCosts': [{
        'plane': 32,
        'car': 34,
        'bus': 32,
        'train': 0,
        'boat': 0,
        'other': 0
      }],
      'lodgingCosts': [{
        'hotel': 344,
        'airBnB': 87,
        'other': 77,
      }],
      'miscCosts': [{
        'fun': 565,
        'other': 56,
      }],
    },
    function (err) {
      if (err) return console.log(err);
      return res.send(202);
    });
};
