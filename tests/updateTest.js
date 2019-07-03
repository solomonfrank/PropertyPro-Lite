/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for create property endpoint', () => {
    it('user can update  specific details property  if valid token provided', (done) => {
        //mock login to get token
        const valid_input = {
            "email": "test6@yahoo.com",
            "password": "1234567"
        }

        chai.request(app).post('/api/v1/signin')
            .send(valid_input)
            .end((err, response) => {


                const token = response.body.data.token;
                const propId = 1;
                const data = {

                    status: 'available',
                    price: 52525,
                    state: 'Lagos',
                    city: 'Lagos',
                    address: 'Lagos',
                    type: '2bedroom',
                };
                chai.request(app).patch(`/api/v1/property/${propId}`)
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
