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
            confirmPassword: '1234567',
            firstName: 'test',
            lastName: 'est',
            gender: 'male',
            address: '5 hillary street',
            phoneNumber: '7363737376',


        };
        chai.request(app).post('/auth/api/v1/signup').send(dataVal).end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('data').equal('"email address" is not allowed to be empty');
            res.body.should.have.property('status').equal(400);

            done();
        });
    });
    it('user should not signup when address is not provided', (done) => {
        const dataVal = {
            email: 'test@gmail.com',
            password: '1234567',
            confirmPassword: '1234567',
            firstName: 'test',
            lastName: 'est',
            gender: 'male',
            phoneNumber: '7363737376',


        };
        chai.request(app).post('/auth/api/v1/signup').send(dataVal).end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('data').equal('"address" is required');
            res.body.should.have.property('status').equal(400);

            done();
        });
    });
    it('user should not signup when address is empty', (done) => {
        const dataVal = {
            email: 'test@gmail.com',
            password: '1234567',
            confirmPassword: '1234567',
            firstName: 'test',
            lastName: 'est',
            gender: 'male',
            address: '',
            phoneNumber: '7363737376',


        };
        chai.request(app).post('/auth/api/v1/signup').send(dataVal).end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('data').equal('"address" is not allowed to be empty');
            res.body.should.have.property('status').equal(400);

            done();
        });
    });
    it('User should not sign up a user when first is not provided', (done) => {
        const dataVal = {
            email: 'test5@yahoo.com',
            password: '1234567',
            confirmPassword: '1234567',
            phoneNumber: '7363737376',
            lastName: 'est',
            gender: 'male',
            address: '5 hillary street',


        };
        chai
            .request(app)
            .post('/auth/api/v1/signup')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have
                    .property('data')
                    .equal('"first name" is required');

                done();
            });
    });

    it('User should not sign up a user when last name is not provided', (done) => {
        const dataVal = {
            email: 'test5@yahoo.com',
            password: '1234567',
            confirmPassword: '1234567',
            firstName: 'test',
            phoneNumber: '7363737376',
            gender: 'male',
            address: '5 hillary street',


        };
        chai
            .request(app)
            .post('/auth/api/v1/signup')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('data').equal('"last name" is required');

                done();
            });
    });

    it('User should not sign up a user when first name is empty', (done) => {
        const dataVal = {
            email: 'test5@yahoo.com',
            password: '1234567',
            confirmPassword: '1234567',
            firstName: '',
            lastName: 'est',
            gender: 'male',
            address: '5 hillary street',
            phoneNumber: '7363737376',


        };
        chai
            .request(app)
            .post('/auth/api/v1/signup')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('data').equal('"first name" is not allowed to be empty');

                done();
            });
    });

    it('User should not sign up a user when password is not provided', (done) => {
        const dataVal = {
            email: 'test5@yahoo.com',
            password: '',
            confirmPassword: '1234567',
            firstName: 'test',
            lastName: 'est',
            gender: 'male',
            address: '5 hillary street',
            phoneNumber: '7363737376',


        };
        chai
            .request(app)
            .post('/auth/api/v1/signup')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('data').equal('"password" is not allowed to be empty');

                done();
            });
    });
    it('User should not sign up a user when phone number is not provided', (done) => {
        const dataVal = {
            email: 'test5@yahoo.com',
            password: '',
            confirmPassword: '1234567',
            firstName: 'test',
            lastName: 'est',
            gender: 'male',
            address: '5 hillary street',
            phoneNumber: '',


        };
        chai
            .request(app)
            .post('/auth/api/v1/signup')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('data').equal('"password" is not allowed to be empty');

                done();
            });
    });
    it('User should not sign up a user when phone number is not provided', (done) => {
        const dataVal = {
            email: 'test5@yahoo.com',
            password: '1234567',
            confirmPassword: '1234567',
            firstName: 'test',
            lastName: 'est',
            gender: 'male',
            address: '5 hillary street',


        };
        chai
            .request(app)
            .post('/auth/api/v1/signup')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('data').equal('"phoneNumber" is required');

                done();
            });
    });

    it('User should not sign up a user when passwords do not match', (done) => {
        const dataVal = {
            email: 'test5@yahoo.com',
            password: '1234567',
            confirmPassword: '12345670',
            firstName: 'test',
            lastName: 'est',
            gender: 'male',
            address: '5 hillary street',
            phoneNumber: '7363737376',


        };
        chai
            .request(app)
            .post('/auth/api/v1/signup')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('data').equal('Password do not match');

                done();
            });
    });

    it('User should not sign up a user if email already exist', (done) => {
        const dataVal = {
            email: 'test10@yahoo.com',
            password: '1234567',
            confirmPassword: '1234567',
            firstName: 'test',
            lastName: 'est',
            gender: 'male',
            address: '5 hillary street',
            phoneNumber: '7363737376',


        };
        chai
            .request(app)
            .post('/auth/api/v1/signup')
            .send(dataVal)
            .end((err, res) => {
                // eslint-disable-next-line no-console

                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('data').equal('email already exist');

                done();
            });
    });


    it('sign up user when all fields are provided', (done) => {
        const dataVal = {
            email: 'test131211@gmail.com',
            password: '1234567',
            confirmPassword: '1234567',
            firstName: 'test',
            lastName: 'est',
            gender: 'male',
            address: '5 hillary street',
            phoneNumber: '7363737376',


        };


        chai
            .request(app)
            .post('/auth/api/v1/signup')
            .send(dataVal)
            .end((err, res) => {
                res.body.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('token');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('firstname');
                res.body.data.should.have.property('lastname');
                res.body.data.should.have.property('address');
                res.body.data.should.have.property('gender');
                res.body.data.should.have.property('createdat');
                res.body.should.have.property('status');
                done();
            });
    });
});
