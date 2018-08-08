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

    it("should display index.html file on GET", function() {
        return chai
            .request(app)
            .get('/')
            .then(function(res) {
                expect(res).to.be.a('object');
            });
    });
});