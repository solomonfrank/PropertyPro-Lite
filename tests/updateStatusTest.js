/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for  property sold status endpoint', function () {
    let tokens;
    this.timeout(0);




    it('user can update property  status if valid token provided and property is available', (done) => {
        //mock login to get token
        (async function () {
            const valid_input = {
                "email": "test5@yahoo.com",
                "password": "1234567"
            }
            let res;

            try {
                let request = chai.request(app).keepOpen();
                let id = 18;

                let signResponse = await request.post('/auth/signin').send(valid_input);
                let token = signResponse.body.data.token;
                res = await request.patch(`/property/${id}/sold`).set('Authorization', `Bearer ${token}`).send();

                res.body.should.have.status('success');


                done()
            } catch (err) {
                // console.log(err.stack) 
                res.body.should.have.status('Property does not exist');
            }

        })();

        //send login request to the app to receive token









    });

    it('user cannot update property  id property is not found', (done) => {
        //mock login to get token
        (async function () {
            const valid_input = {
                "email": "test5@yahoo.com",
                "password": "1234567"
            }


            try {
                let request = chai.request(app).keepOpen();
                let id = 100;

                let signResponse = await request.post('/auth/signin').send(valid_input);
                let token = signResponse.body.data.token;
                let res = await request.patch(`/property/${id}/sold`).set('Authorization', `Bearer ${token}`).send();
                console.log(res.body);
                res.body.should.have.status('Property does not exist');


                done()
            } catch (err) { console.log(err.stack) }

        })();

        //send login request to the app to receive token









    });

});
