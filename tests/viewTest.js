/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for view specific property endpoint', () => {
    it('view specific  property details when property is provided', (done) => {
        const propId = 1;

        chai
            .request(app)

            .get(`/api/v1/property/${propId}`)

            .send()
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('status');
                res.body.data.should.have.property('owner');
                res.body.data.should.have.property('price');
                res.body.data.should.have.property('state');
                res.body.data.should.have.property('city');
                res.body.data.should.have.property('address');
                res.body.data.should.have.property('type');
                res.body.data.should.have.property('created_on');
                res.body.data.should.have.property('image_url');
                res.body.should.have.property('status').equal(200);
                done();
            });
    });


    it('user can not view specific property when property id is missing', (done) => {
        const propId = 5;


        chai
            .request(app)

            .get(`/api/v1/property/${propId}`)

            .send()
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.status(404);
                res.body.should.have.property('data').equal('property not found');

                res.body.should.have.property('status').equal(404);
                done();
            });
    });
});
