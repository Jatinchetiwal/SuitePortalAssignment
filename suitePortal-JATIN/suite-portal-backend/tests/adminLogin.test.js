const request = require('supertest');
const app = require('../src/app');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json'); 
const db = low(adapter);

describe('Admin Login API', () => {
  let server;

  before(() => {
    server = app.listen(3001);
  });

  after(() => {
    server.close(); 
  });

  beforeEach(() => {
    const adminExists = db.get('admins').find({ username: 'admin' }).value();
    if (!adminExists) {
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync('password123', saltRounds);

      db.get('admins').push({
        username: 'admin',
        password: hashedPassword
      }).write();
    }
  });

  describe('POST /api/auth/login', () => {
    it('should log in and return a token', (done) => {
      request(server)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'password123' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should handle login errors', (done) => {
      request(server)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'wrongpassword' })
        .expect(401, done); 
    });
  });
});
