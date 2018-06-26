"use strict";

const db = require('../../services/database');

describe('Database drop', function () {
   it('should drop the collections', function (done) {
       db.open();
       let connection = db.connection;

       let promises = [];
       let collections = ['movies', 'comments', 'ratings'];
       for(let col of collections) {
           promises.push(new Promise(resolve => {
               try {
                   connection.dropCollection(col, function (err) {
                       resolve();
                   });
               } catch(err) {
                   resolve(); //if error collection does not exist
               }
           }));
       }
       Promise.all(promises)
           .then(() =>
               done()
           );
   });
});