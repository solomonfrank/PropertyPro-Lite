/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
// import app from "../index";

chai.should();
chai.use(chaiHttp);

describe('Testing for signin endpoint', () => {
    it('User should not sign in a user when email is empty', (done) => {
        const dataVal = {
            email: '',
            password: '123456',
        };
        chai
            .request(app)
            .post('/auth/signin')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have
                    .property('error')
                    .equal('email address is invalid');
                res.body.should.have.property('status').equal('error');
                done();
            });
    });

    it('User should not sign in a user when password is empty', (done) => {
        const dataVal = {
            email: 'test5@yahoo.com',

            password: '',
        };
        chai
            .request(app)
            .post('/auth/signin')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have
                    .property('error')
                    .equal('some fields are required');
                res.body.should.have.property('status').equal('error');

                done();
            });
    });

    it('sign in user when all fields are provided', (done) => {
        const dataVal = {
            email: 'test5@yahoo.com',

            password: '1234567',
        };
        chai
            .request(app)
            .post('/auth/signin')
            .send(dataVal)
            .end((err, res) => {
                res.body.should.have.status('success');
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('token');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('first_name');
                res.body.data.should.have.property('last_name');
                res.body.data.should.have.property('created_at');
                res.body.data.should.have.property('address');
                res.body.data.should.have.property('phone_number');
                res.body.data.should.have.property('is_admin');

                // res.body.should.have.property('status');
                done();
            });
    });
});
