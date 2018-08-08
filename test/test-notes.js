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

    it("should display notes.html file on GET", function() {
        return chai
            .request(app)
            .get('/notes')
            .then(function(res) {
                expect(res).to.be.a('object');
            });
    });

    it('should update notes on PUT request', function() {
        const noteData = { notes: 'This is a note' };
        return (
            chai
            .request(app)
            .get('/notes')
            .then(function(res) {
                noteData.id = '5b6a6fa40685e84a300a4291';
                return chai.request(app)
                    .put(`/notes/${noteData.id}`)
                    .send(noteData)
            })
            .then(function(res) {
                expect(res).to.be.a('Object');
            })
        );
    });




});