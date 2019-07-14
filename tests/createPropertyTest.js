/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for create property endpoint', () => {
    it('user can create property  if valid token provided', (done) => {
        //mock login to get token
        const valid_input = {
            "email": "test9@yahoo.com",
            "password": "1234567"
        }
        //send login request to the app to receive token
        chai.request(app).post('/auth/signin')
            .send(valid_input)
            .end((err, response) => {

                //add token to next request Authorization headers as Bearer adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
                const token = response.body.data.token;
                console.log(token);

                const data = {

                    status: 'available',
                    price: 52525,
                    state: 'Lagos',
                    city: 'Lagos',
                    address: 'Lagos',
                    type: '2bedroom',
                };
                chai.request(app).post('/property')
                    .set('Authorization', `Bearer ${token}`)
                    .send(data)
                    .end((err, res) => {

                        res.body.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('id');
                        res.body.data.should.have.property('status');
                        res.body.data.should.have.property('ownerid');
                        res.body.data.should.have.property('price');
                        res.body.data.should.have.property('state');
                        res.body.data.should.have.property('city');
                        res.body.data.should.have.property('address');
                        res.body.data.should.have.property('type');
                        res.body.data.should.have.property('image_url');
                        res.body.data.should.have.property('created_on');
                        res.body.should.have.property('status').equal(201);


                        done();
                    });
            });
    })



    it('user can not create property when token is missing', (done) => {

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

            .post('/property')

            .send(data)
            .end((err, res) => {
                res.body.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('data').equal('forbidden');

                res.body.should.have.property('status').equal(403);
                done();
            });
    });
});
