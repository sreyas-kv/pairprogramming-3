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

    it("should Signup with POST", function() {
        const loginDetails = { firstName: 'Daniel', lastName: 'Stefanovic', location: 'St. Gallen, Switzerland', githubUsername: 'danistefanovic', password: 'danistefanovic123' };
        return chai.request(app)
            .post('/signup')
            .send(loginDetails)
            .then(function(res) {
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');

            });

    });
});