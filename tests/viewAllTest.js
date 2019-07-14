/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import like from 'chai-like';
import things from 'chai-things';
import app from '../index';

chai.should();
chai.use(chaiHttp);
chai.use(like);
chai.use(things);

chai.should();
chai.use(chaiHttp);

describe('Testing for fetch all properties endpoint', () => {
    it('fetch all  property available for advert', (done) => {
        chai
            .request(app)

            .get('/property')

            .send()
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');

                res.body.data.should.be.an('array').that.contains.something.property('id');
                res.body.data.should.be.an('array').that.contains.something.property('ownerid');
                res.body.data.should.be.an('array').that.contains.something.property('status');
                res.body.data.should.be.an('array').that.contains.something.property('price');
                res.body.data.should.be.an('array').that.contains.something.property('state');
                res.body.data.should.be.an('array').that.contains.something.property('type');
                res.body.data.should.be.an('array').that.contains.something.property('city');
                res.body.data.should.be.an('array').that.contains.something.property('address');
                res.body.data.should.be.an('array').that.contains.something.property('created_on');
                res.body.data.should.be.an('array').that.contains.something.property('image_url');
                res.body.should.have.property('status').equal(200);
                done();
            });
    });
});
