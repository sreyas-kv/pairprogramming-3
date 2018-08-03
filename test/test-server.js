'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = require('../server');

chai.request(app).get('/');


describe('Test for home endpoint', function() {
    it('testing 200', function() {});

})