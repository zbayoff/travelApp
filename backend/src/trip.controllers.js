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
      'startdate': 'June 7, 2018',
      'leavedate': 'June 14, 2018',
      'image': 'madrid.png',
      'totalCost': 0,
      'costs': [
        {
          'costLabel':"plane",
          'costAmt':600
        },
        {
          'costLabel':"car",
          'costAmt':40
        },
        {
          'costLabel':"boat",
          'costAmt':54
        }
      ]
    }, {
      'destination': 'Geneva, Switzerland',
      'startdate': 'June 12, 2018',
      'leavedate': 'June 21, 2018',
      'image': 'geneva.png',
      'totalCost': 0,
      'costs': [
        {
          'costLabel':"plane",
          'costAmt':600
        },
        {
          'costLabel':"car",
          'costAmt':40
        },
        {
          'costLabel':"boat",
          'costAmt':54
        }
      ]
    }, {
      'destination': 'Rome, Italy',
      'startdate': 'May 15, 2018',
      'leavedate': 'May 27, 2018',
      'image': 'rome.png',
      'totalCost': 0,
      'costs': [
        {
          'costLabel':"plane",
          'costAmt':600
        },
        {
          'costLabel':"car",
          'costAmt':40
        },
        {
          'costLabel':"boat",
          'costAmt':54
        }
      ]
    },
    function (err) {
      if (err) return console.log(err);
      return res.send(202);
    });
};
