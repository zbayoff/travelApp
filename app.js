const express = require('express');
const path = require('path');
const app = express();


const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

const mongoose = require('mongoose');
const config = require('./config/database');
// const mongoUri = 'mongodb://localhost/trips';

// const mongoUri = 'mongodb://devereld:dd2345@ds015730.mlab.com:15730/recipes-dd';
mongoose.connect(config.database, { useMongoClient: true } );

// app.use(express.static(path.join(__dirname, 'public')));

// make sure this line always appears before any routes
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next()
})

const tripModels = require('./src/trip.model'); 

const routes = require('./src/trip.routes');
const appRoutes = routes(app);

app.get('/', function (req, res) {
    res.send('api is up');
});

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

app.listen(port);
console.log(`Server running at http://localhost:${port}/`);














