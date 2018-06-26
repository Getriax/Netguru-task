"use strict";

process.env.NODE_ENV = 'test';

const chai       = require('chai'),
    chaiHttp   = require('chai-http'),
    should     = chai.should(),
    testId     = require('../../config').testId,
    app        = require('../../server');

chai.use(chaiHttp);

describe('Comment POST /', function () {

    it('should create a comment for a movie with the "Guardians of the galaxy" with the testId', function (done) {
        let comment = {
            movieId: testId,
            body: "Nice movie, Marvel rules!"
        };
        chai.request(app)
            .post('/comments')
            .send(comment)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('movieId').eql(testId);
                res.body.should.have.property('body').eql('Nice movie, Marvel rules!');
                done();
            });
    });

    it('should create the comment from a Marvel hater', function (done) {
        let comment = {
            movieId: testId,
            body: "Buuu, Marvel s**ks!" //I can filter that for a job :D
        };
        chai.request(app)
            .post('/comments')
            .send(comment)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('movieId').eql(testId);
                res.body.should.have.property('body').eql('Buuu, Marvel s**ks!');
                done();
            });
    });
});
describe('Comment GET /', function () {

    it('should return all the comments', function (done) {
        chai.request(app)
            .get('/comments')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.property('length').eql(2);
                done();
            });
    });

    it('should return all the comments for the "Guardians of the galaxy" movie', function (done) {
        chai.request(app)
            .get('/comments/' + testId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.property('length').eql(2);
                done();
            });
    });

});