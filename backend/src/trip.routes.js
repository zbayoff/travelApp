const trips = require('./trip.controllers');

const tripRoutes = function(app) {
    app.get('/api/trip', trips.findAll);
    app.get('/api/trip/:id', trips.findById);
    app.post('/api/trip', trips.add);
    app.put('/api/trip/:id', trips.update);
    app.delete('/api/trip/:id', trips.delete);
    
    app.get('/api/import', trips.import);
}

module.exports = tripRoutes;