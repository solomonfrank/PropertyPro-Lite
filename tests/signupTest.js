/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

// eslint-disable-next-line prettier/prettier
describe('Testing for signup endpoint', () => {

    it('user should not signup when email is empty', (done) => {
        const dataVal = {
            email: '',
            password: '1234567',

            first_name: 'test',
            last_name: 'est',

            address: '5 hillary street',
            phone_number: '7363737376',


        };
        chai.request(app).post('/auth/signup').send(dataVal).end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('error').equal('email address is invalid');
            res.body.should.have.property('status').equal('error');

            done();
        });
    });

    it('user should not signup when email is wrong', (done) => {
        const dataVal = {
            email: 'yuueueu.com',
            password: '1234567',

            first_name: 'test',
            last_name: 'est',

            address: '5 hillary street',
            phone_number: '7363737376',


        };
        chai.request(app).post('/auth/signup').send(dataVal).end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('error').equal('email address is invalid');
            res.body.should.have.property('status').equal('error');

            done();
        });
    });

    it('User should not sign up a user when password is not provided', (done) => {
        const dataVal = {
            email: 'test5915@yahoo.com',
            password: '',

            first_name: 'test',
            last_name: 'est',

            address: '5 hillary street',
            phone_number: '7363737376',


        };
        chai
            .request(app)
            .post('/auth/signup')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('error').equal('some fields are required');
                res.body.should.have.property('status').equal('error');
                done();
            });
    });

    it('User should not sign up a user if email already exist', (done) => {
        const dataVal = {
            email: 'test5@yahoo.com',
            password: '1234567',

            first_name: 'test',
            last_name: 'test',

            address: '5 hillary street',
            phone_number: '7363737376',


        };
        chai
            .request(app)
            .post('/auth/signup')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('error').equal('email already exist');
                res.body.should.have.property('status').equal('error');
                done();
            });
    });


    it('sign up user when all fields are provided', (done) => {
        const dataVal = {

            email: 'test20505@gmail.com',

            password: '1234567',

            first_name: 'test',
            last_name: 'test',

            address: '5 hillary street',
            phone_number: '7363737376',


        };


        chai
            .request(app)
            .post('/auth/signup')
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
                res.body.data.should.have.property('address');
                res.body.data.should.have.property('phone_number');
                res.body.data.should.have.property('created_at');

                done();
            });
    });
});
