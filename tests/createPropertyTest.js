/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for create property endpoint', function () {
    let tokens;
    this.timeout(10000);



    it('user can create property  if valid token provided', (done) => {
        //mock login to get token
        (async function () {
            const valid_input = {
                "email": "test10@yahoo.com",
                "password": "1234567"
            }
            const data = {


                state: 'lagos',
                city: 'lagos',
                type: '2 bedroom',
                price: '23890',
                address: 'festac'
            };

            try {
                let request = chai.request(app).keepOpen();

                let signResponse = await request.post('/auth/signin').send(valid_input);


                let token = signResponse.body.data.token;

                let res = await request.post('/property').set('Authorization', `Bearer ${token}`)
                    .attach('image_url', 'tests/wild.jpeg')
                    .field(data)
                res.body.should.have.status('success');


                done();
            } catch (err) {

                console.log(err.stack);
            }

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
                let res = await request.post('/property').set('Authorization', `Bearer ${token}`).send(data)
                res.body.should.have.status('error');

                done();


            } catch (err) { console.log(err.stack) }

        })();

        //send login request to the app to receive token









    });

});
