const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { app, runServer, closeServer } = require('../server');
chai.use(chaiHttp);

const { DATABASE_TEST_URL } = require("../config");

const userCredntials = {
    userName: 'sreyas-kv',
    password: 'sreyas-kv123'
}

let authenticatedUser = request(app);
before(function(done) {
    authenticatedUser
        .post('/login')
        .send(userCredentials)
        .end(function(err, response) {
            expect(response.statusCode).to.equal(200);
            expect('Locaiton', '/hello');
            done();
        });
});

describe('GET /hello', function(done) {
    it('should return a 200 response if the user is logged in',
        function(done) {
            authenticatedUser.get('/hello')
                .expect(200, done);
        });

    it('should return a 302 response and redirect to /login',
        function(done) {
            request(app).get('/login')
                .expect('Locaiton', '/login')
                .expect(302, done);
        });
});