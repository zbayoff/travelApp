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
      'totalCost': 0,
      'startdate': 'May 15',
      'leavedate': 'May 20',
      'image': 'madrid.png',
      'travelCosts': {
        'plane': 500,
        'car': 200,
        'bus': 0,
        'train': 100,
        'boat': 0,
        'other': 0
      },
      'lodgingCosts': {
        'hotelMotel': 300,
        'airBnB': 200,
        'other': 0,
      },
      'miscCosts': {
        'misc': 200,
      }
    }, {
      'destination': 'Geneva, Switzerland',
      'totalCost': 0,
      'startdate': 'May 15',
      'leavedate': 'May 20',
      'image': 'madrid.png',
      'travelCosts': {
        'plane': 1000,
        'car': 200,
        'bus': 20,
        'train': 0,
        'boat': 0,
        'other': 0
      },
      'lodgingCosts': {
        'hotelMotel': 300,
        'airBnB': 300,
        'other': 0,
      },
      'miscCosts': {
        'misc': 400,
      }
    }, {
      'destination': 'Rome, Italy',
      'totalCost': 0,
      'startdate': 'May 15',
      'leavedate': 'May 20',
      'image': 'madrid.png',
      'travelCosts': {
        'plane': 700,
        'car': 0,
        'bus': 40,
        'train': 0,
        'boat': 300,
        'other': 0
      },
      'lodgingCosts': {
        'hotelMotel': 200,
        'airBnB': 0,
        'other': 30,
      },
      'miscCosts': {
        'misc': 400,
      }
    },
    function (err) {
      if (err) return console.log(err);
      return res.send(202);
    });
};
