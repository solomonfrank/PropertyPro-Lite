/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for credit-account endpoint', () => {
    it('create property when all fields are provided', (done) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOnsiaWQiOjJ9LCJpYXQiOjE1NjE4MjIyNTF9.uatr4cG2syDUpASSLtcPaL-0T0ZGfMK1R_l25U9xqLc';
        const data = {

            status: 'available',
            price: 52525,
            state: 'Lagos',
            city: 'Lagos',
            address: 'Lagos',
            type: '2bedroom',
        };

        chai
            .request(app)

            .post('/api/v1/create')
            .set('x-access-token', token)
            .send(data)
            .end((err, res) => {
                res.body.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('status');
                res.body.data.should.have.property('ownerEmail');
                res.body.data.should.have.property('price');
                res.body.data.should.have.property('state');
                res.body.data.should.have.property('city');
                res.body.data.should.have.property('address');
                res.body.data.should.have.property('type');
                res.body.data.should.have.property('created_on');
                res.body.should.have.property('status').equal(201);
                done();
            });
    });

    it('user can not create property when token is missing', (done) => {
        const token = '';
        const data = {

            status: 'available',
            price: 52525,
            state: 'Lagos',
            city: 'Lagos',
            address: 'Lagos',
            type: '2bedroom',
        };

        chai
            .request(app)

            .post('/api/v1/create')
            .set('x-access-token', token)
            .send(data)
            .end((err, res) => {
                res.body.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('data').equal('Not authorize to access the page');

                res.body.should.have.property('status').equal(400);
                done();
            });
    });
});
