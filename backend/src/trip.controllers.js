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
      'startdate': 'June 7',
      'leavedate': 'June 14',
      'image': 'madrid.png',
      'url1': 'https://www.google.com/flights?lite=0#flt=/m/02_286./m/056_y.2018-06-07.JFKLHR0BA176~LHRMAD1BA512*/m/056_y./m/02_286.2018-06-14.MADJFK0AA95;c:USD;e:1;a:AA*AA;sd:1;t:f;sp:.USD.55751*.USD.55751',
      'url2': 'https://www.hotels.com/search.do?resolved-location=CITY%3A457987%3AUNKNOWN%3AUNKNOWN&destination-id=457987&q-destination=Madrid,%20Spain&q-check-in=2018-05-13&q-check-out=2018-05-14&q-rooms=1&q-room-0-adults=2&q-room-0-children=0',
      'travelCosts': {
        'plane': 558,
        'car': 300,
        'bus': 0,
        'train': 100,
        'boat': 0,
        'other': 0
      },
      'lodgingCosts': {
        'hotelMotel': 400,
        'airBnB': 0,
        'other': 0,
      },
      'miscCosts': {
        'misc': 400,
      }
    }, {
      'destination': 'Geneva, Switzerland',
      'totalCost': 0,
      'startdate': 'June 12',
      'leavedate': 'June 21',
      'image': 'geneva.png',
      'url1': 'https://www.google.com/flights?lite=0#flt=/m/02_286./m/03902.2018-06-12.JFKLHR0AA100~LHRGVA1BA726*/m/03902./m/02_286.2018-06-21.GVAMAD0IB3483~MADJFK0IB6253;c:USD;e:1;a:AA*AA;sd:1;t:f;sp:.USD.89221*.USD.89221',
      'url2': 'https://www.hotels.com/search.do?resolved-location=CITY%3A173674%3AUNKNOWN%3AUNKNOWN&destination-id=173674&q-destination=Geneva,%20Switzerland&q-check-in=2018-05-13&q-check-out=2018-05-14&q-rooms=1&q-room-0-adults=2&q-room-0-children=0',
      'travelCosts': {
        'plane': 893,
        'car': 400,
        'bus': 0,
        'train': 0,
        'boat': 100,
        'other': 0
      },
      'lodgingCosts': {
        'hotelMotel': 0,
        'airBnB': 400,
        'other': 0,
      },
      'miscCosts': {
        'misc': 350,
      }
    }, {
      'destination': 'Rome, Italy',
      'totalCost': 0,
      'startdate': 'May 15',
      'leavedate': 'May 27',
      'image': 'rome.png',
      'url1': 'https://www.google.com/flights/#flt=/m/02_286./m/06c62.2018-05-15*/m/06c62./m/02_286.2018-05-27;c:USD;e:1;sd:1;t:f',
      'url2': 'https://www.hotels.com/search.do?resolved-location=CITY%3A1729991%3AUNKNOWN%3AUNKNOWN&destination-id=1729991&q-destination=Monti,%20Rome,%20Italy&q-check-in=2018-05-13&q-check-out=2018-05-14&q-rooms=1&q-room-0-adults=2&q-room-0-children=0&f-hotel-id=280065',
      'travelCosts': {
        'plane': 814,
        'car': 200,
        'bus': 0,
        'train': 0,
        'boat': 60,
        'other': 0
      },
      'lodgingCosts': {
        'hotelMotel': 500,
        'airBnB': 0,
        'other': 30,
      },
      'miscCosts': {
        'misc': 200,
      }
    },
    function (err) {
      if (err) return console.log(err);
      return res.send(202);
    });
};
