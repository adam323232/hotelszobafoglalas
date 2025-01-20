require('dotenv').config();
const { connect } = require('http2');
const mongoose = require('mongoose');

var mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL);

var connection = mongoose.connection;

connection.on('error', () => {
    console.log('A Mongo DB csatlakozás sikertlen');
});

connection.on('connected', () => {
    console.log('A Mongo DB csatlakozás sikeres');
});

module.exports = mongoose;
