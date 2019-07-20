/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for view  all property endpoint', function () {
    let tokens;
    this.timeout(5000);




    it('user can view all property details if valid token provided and property is available', (done) => {
        //mock login to get token
        (async function () {
            const valid_input = {
                "email": "test5@yahoo.com",
                "password": "1234567"
            }



            try {
                let request = chai.request(app).keepOpen();


                let signResponse = await request.post('/auth/signin').send(valid_input);
                let token = signResponse.body.data.token;
                const data = {
                    token,
                };
                let res = await request.get(`/property`).set('Authorization', `Bearer ${token}`).send(data);

                res.body.should.have.status('success');



                done()
            } catch (err) { console.log(err.stack) }

        })();

        //send login request to the app to receive token









    });



});
