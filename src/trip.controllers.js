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
      'image': {
        'url': 'madrid.png',
        'user': 'zach',
        'userUrl': 'zach.com'
      },
      'totalCost': 0,
      'costs': [{
          'costLabel': "plane",
          'costAmt': 500
        },
        {
          'costLabel': "car",
          'costAmt': 100
        },
        {
          'costLabel': "boat",
          'costAmt': 50
        }
      ]
    }, {
      'destination': 'Geneva, Switzerland',
      'startdate': 'June 12, 2018',
      'leavedate': 'June 21, 2018',
      'image': {
        'url': 'geneva.png',
        'user': 'zach',
        'userUrl': 'zach.com'
      },
      'totalCost': 0,
      'costs': [{
          'costLabel': "plane",
          'costAmt': 1000
        },
        {
          'costLabel': "car",
          'costAmt': 200
        },
        {
          'costLabel': "boat",
          'costAmt': 30
        }
      ]
    }, {
      'destination': 'Rome, Italy',
      'startdate': 'May 15, 2018',
      'leavedate': 'May 27, 2018',
      'image': {
        'url': 'rome.png',
        'user': 'zach',
        'userUrl': 'zach.com'
      },
      'totalCost': 0,
      'costs': [{
          'costLabel': "plane",
          'costAmt': 1200
        },
        {
          'costLabel': "car",
          'costAmt': 300
        },
        {
          'costLabel': "boat",
          'costAmt': 20
        }
      ]
    },
    function (err) {
      if (err) return console.log(err);
      return res.send(202);
    });
};