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

    it("should Login with POST", function() {
        const loginDetails = { githubUsername: 'sreyas-kv', password: 'sreyas-kv123' };
        return chai.request(app)
            .post('/login')
            .send(loginDetails)
            .then(function(res) {
                // console.log('test res: ', res);
                expect(res).to.be.a('object');
            });
    });
});