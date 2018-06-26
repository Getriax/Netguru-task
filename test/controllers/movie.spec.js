"use strict";

process.env.NODE_ENV = 'test';

const chai       = require('chai'),
      chaiHttp   = require('chai-http'),
      should     = chai.should(),
      testId     = require('../../config').testId,
      app        = require('../../server');

    chai.use(chaiHttp);

describe('Movie POST /', function () {
    it('should create a movie with a title "Guardians of the galaxy"', function (done) {
        let movie = {
            title: "Guardians of the galaxy"
        };
        chai.request(app)
            .post('/movies')
            .send(movie)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('Title').eql('Guardians of the Galaxy');
                res.body.should.have.property('_id').eql(testId);
                res.body.should.have.property('Ratings').with.length(3);
                done();
            });
    });

    it('should return an error requesting title in the body', function (done) {
        chai.request(app)
            .post('/movies')
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Title is required');
                done();
            });
    })
});
describe('Movie GET /', function () {

    it('should return all the movies', function (done) {
        chai.request(app)
            .get('/movies')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.property(res.body.length - 1).with.property('Title').eql('Guardians of the Galaxy');
                done();
            });
    });



});