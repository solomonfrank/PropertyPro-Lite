/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for create property endpoint', () => {
    let tokens;




    it('user can create property  if valid token provided', (done) => {
        //mock login to get token
        (async function () {
            const valid_input = {
                "email": "test5@yahoo.com",
                "password": "1234567"
            }
            const data = {


                price: 52525,
                state: 'Lagos',
                city: 'Lagos',
                address: 'Lagos',
                type: '2bedroom',
            };

            try {
                let request = chai.request(app).keepOpen();

                let signResponse = await request.post('/auth/signin').send(valid_input);
                let token = signResponse.body.data.token;
                let res = await request.post('/api/v1/property').set('Authorization', `Bearer ${token}`).send(data)
                res.body.should.have.status('success');
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('data');
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('status');
                res.body.data.should.have.property('owner');
                res.body.data.should.have.property('price');
                res.body.data.should.have.property('state');
                res.body.data.should.have.property('city');
                res.body.data.should.have.property('address');
                res.body.data.should.have.property('type');
                res.body.data.should.have.property('image_url');
                res.body.data.should.have.property('created_on');

                done()
            } catch (err) { console.log(err.stack) }

        })();

        //send login request to the app to receive token









    });

    it('user can not create property  if valid token is not provided', (done) => {
        //mock login to get token
        (async function () {
            const valid_input = {
                "email": "test5@yahoo.com",
                "password": "1234567"
            }
            const data = {


                price: 52525,
                state: 'Lagos',
                city: 'Lagos',
                address: 'Lagos',
                type: '2bedroom',
            };

            try {
                let request = chai.request(app).keepOpen();

                let signResponse = await request.post('/auth/signin').send(valid_input);
                let token = "";
                let res = await request.post('/api/v1/property').set('Authorization', `Bearer ${token}`).send(data)
                res.body.should.have.status('error');

                done();


            } catch (err) { console.log(err.stack) }

        })();

        //send login request to the app to receive token









    });

});
