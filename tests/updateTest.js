/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for update property endpoint', function () {
    let tokens;
    this.timeout(5000);



    it('user can update property details if valid token provided and property is available', (done) => {
        //mock login to get token
        (async function () {
            const valid_input = {
                "email": "test10@yahoo.com",
                "password": "1234567"
            }
            let res;

            const data = {
                price: "1500000"
            }


            try {
                let request = chai.request(app).keepOpen();
                let id = 18;

                let signResponse = await request.post('/auth/signin').send(valid_input);
                let token = signResponse.body.data.token;
                res = await request.patch(`/property/${id}`).set('Authorization', `Bearer ${token}`).send(data);

                res.body.should.have.status('success');



                done()
            } catch (err) {
                // console.log(err.stack)
                console.log(res.body);
                res.body.should.have.status('error');

            }

        })();

        //send login request to the app to receive token









    });



});
