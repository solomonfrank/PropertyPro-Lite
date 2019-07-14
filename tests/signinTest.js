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
                    .property('data')
                    .equal('"email address" is not allowed to be empty');
                res.body.should.have.property('status').equal(400);
                done();
            });
    });

    it('User should not sign in a user when password is empty', (done) => {
        const dataVal = {
            email: 'test6@yahoo.com',

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
                    .property('data')
                    .equal('"password" is not allowed to be empty');
                res.body.should.have.property('status').equal(400);

                done();
            });
    });

    it('sign in user when all fields are provided', (done) => {
        const dataVal = {
            email: 'test1@yahoo.com',

            password: '1234567',
        };
        chai
            .request(app)
            .post('/auth/signin')
            .send(dataVal)
            .end((err, res) => {
                // res.body.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('token');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('firstname');
                res.body.data.should.have.property('lastname');
                res.body.data.should.have.property('createdat');
                res.body.data.should.have.property('address');
                res.body.data.should.have.property('phonenumber');
                res.body.data.should.have.property('isadmin');
                res.body.data.should.have.property('gender');
                res.body.should.have.property('status').equal(200);
                done();
            });
    });
});
