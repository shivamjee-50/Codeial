const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_user');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));

db.once('open', function(){
    console.log('Successfully connected to database');
});

module.exports = db;