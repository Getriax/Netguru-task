"use strict";
const mongoose = require('mongoose'),
    config = require('../config'),
    connectionString = config.databaseUrl;


//Connection with database
class Database {

    constructor() {
        this.connection = null;
    }

    open() {
        var options = {
            promiseLibrary: global.Promise
        };
        mongoose.connect(connectionString, options, (err) => {
            if (err) {
                console.log('mongoose.connect() failed: ' + err);
            }
        });
        this.connection = mongoose.connection;

        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB: ' + err);
        });

        mongoose.connection.once('open', () => {
            console.log('We have connected to mongodb');
        });

    }

    close() {
        this.connection.close(() => {
        });
    }

}

module.exports = new Database();