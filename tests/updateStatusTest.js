/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for update status property endpoint', () => {
    it('user can update  status property  if valid token provided', (done) => {
        //mock login to get token
        const validInput = {
            "email": "test6@yahoo.com",
            "password": "1234567"
        }

        chai.request(app).post('/api/v1/signin')
            .send(validInput)
            .end((err, response) => {


                const token = response.body.data.token;
                const propId = 1;
                const data = {

                    "status": "sold"

                };
                chai.request(app).patch(`/api/v1/property/${propId}/sold`)
                    .set('x-access-token', token)
                    .send(data)
                    .end((err, res) => {

                        res.body.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('id');
                        res.body.data.should.have.property('status');

                        res.body.data.should.have.property('price');
                        res.body.data.should.have.property('state');
                        res.body.data.should.have.property('city');
                        res.body.data.should.have.property('address');
                        res.body.data.should.have.property('type');
                        res.body.data.should.have.property('created_on');
                        res.body.should.have.property('status').equal(200);


                        done();
                    });
            });
    })


    it('user can not update status property when token is missing', (done) => {
        const token = null;
        const propId = 1;
        const data = {

            status: 'sold',


        };

        chai
            .request(app)

            .patch(`/api/v1/property/${propId}`)
            .set('x-access-token', token)
            .send(data)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.status(500);
                res.body.should.have.property('data').equal('Internal server error');

                res.body.should.have.property('status').equal(500);
                done();
            });
    });

    it('user can not status update property when token is missing', (done) => {
        const token = '';
        const propId = 1;
        const data = {

            status: 'sold',


        };

        chai
            .request(app)

            .patch(`/api/v1/property/${propId}/sold`)
            .set('x-access-token', token)
            .send(data)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.status(400);
                res.body.should.have.property('data').equal('Not authorize to access the page');

                res.body.should.have.property('status').equal(400);
                done();
            });
    });


});
