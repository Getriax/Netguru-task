const mongoose = require('mongoose'),
    config = require('../config'),
    connectionString = config.databaseUrl;

let   connection = null;

class Database {

    open() {
        var options = {
            promiseLibrary: global.Promise
        };
        mongoose.connect(connectionString, options, (err) => {
            if (err) {
                console.log('mongoose.connect() failed: ' + err);
            }
        });
        connection = mongoose.connection;

        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB: ' + err);
            callback(err, false);
        });

        mongoose.connection.once('open', () => {
            console.log('We have connected to mongodb');
        });

    }

}

module.exports = new Database();