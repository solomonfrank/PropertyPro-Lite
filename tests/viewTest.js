/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for view specific property endpoint', function () {


    this.timeout(0);


    it('user can view specific property details if valid token provided and property is available', (done) => {
        //mock login to get token
        (async function () {
            const valid_input = {
                "email": "test10@yahoo.com",
                "password": "1234567"
            }

            let res;

            try {
                let request = chai.request(app).keepOpen();


                let signResponse = await request.post('/auth/signin').send(valid_input);
                let token = signResponse.body.data.token;
                const id = 18;
                const data = {
                    token,
                };
                res = await request.get(`/property/${id}`).set('Authorization', `Bearer ${token}`).send(data);

                res.body.should.have.status('success');



                done()
            } catch (err) {
                //console.log(err.stack)

                res.body.should.have.status('error');
            }

        })();

        //send login request to the app to receive token









    });



});
