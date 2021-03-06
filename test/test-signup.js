const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const { DATABASE_TEST_URL } = require("../config");
const { app, runServer, closeServer } = require('../server');

chai.use(chaiHttp);

describe('Pairprogramming', function() {
    before(function() {
        return runServer(DATABASE_TEST_URL);
    });

    after(function() {
        return closeServer();
    });

    it('should Signup succssfully on POST request', function() {
        const loginDetails = { firstName: 'Daniel', lastName: 'Stefanovic', location: 'St. Gallen, Switzerland', githubUsername: 'danistefanovic', password: 'danistefanovic123' };
        return chai.request(app)
            .post('/signup')
            .send(loginDetails)
            .then(function(res) {
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
            });
    });


    it('should check for required fields(github username and password)', function() {
        const loginDetails = { firstName: 'Daniel', lastName: 'Stefanovic', location: 'St. Gallen, Switzerland', githubUsername: '', password: '' };
        return chai.request(app)
            .post('/signup')
            .send(loginDetails)
            .then(function(res) {
                expect(res).to.be.status(422);
                expect(res.body).to.be.a('object');
            });
    });

    it('should show error for missing field on POST request', function() {
        const loginDetails = { firstName: '', lastName: 'Stefanovic', location: '', githubUsername: 'danistefanovic', password: 'danistefanovic123' };
        return chai.request(app)
            .post('/signup')
            .send(loginDetails)
            .then(function(res) {
                expect(res).to.be.status(500);
                expect(res.body).to.be.a('object');
            });
    });

    it('should error if the input values are not string', function() {
        const loginDetails = { firstName: 1, lastName: 2, location: 'St. Gallen, Switzerland', githubUsername: 'danistefanovic', password: 'danistefanovic123' };
        return chai.request(app)
            .post('/signup')
            .send(loginDetails)
            .then(function(res) {
                expect(res).to.be.status(422);
                expect(res.body).to.be.a('object');
            });
    });

    it('should trim spaces in github username and password field', function() {
        const loginDetails = { firstName: 'Daniel', lastName: 'Stefanovic', location: 'St. Gallen, Switzerland', githubUsername: ' danistefanovic ', password: ' danistefanovic123 ' };
        return chai.request(app)
            .post('/signup')
            .send(loginDetails)
            .then(function(res) {
                expect(res).to.be.status(422);
                expect(res.body).to.be.a('object');
            });
    });

});