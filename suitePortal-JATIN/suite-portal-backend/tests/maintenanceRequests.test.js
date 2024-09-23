const request = require('supertest');
const app = require('../src/app'); // Import the app instance
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json'); // Path to your db.json file
const db = low(adapter);

describe('Maintenance Requests API', () => {
  let server;

  before(() => {
    server = app.listen(3001); // Start the server on a different port
  });

  after(() => {
    server.close(); // Close the server after tests
  });

  beforeEach(() => {
    // Ensure there are some maintenance requests in the database
    db.set('maintenanceRequests', [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        unitNumber: '101',
        serviceType: 'Plumbing',
        summary: 'Leaky faucet',
        details: 'The kitchen faucet is leaking.',
        status: 'open'
      }
    ]).write();
  });

  describe('GET /api/maintenance-requests', () => {
    it('should return a list of maintenance requests', (done) => {
      request(server)
        .get('/api/maintenance-requests')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array').that.is.not.empty;
          done();
        });
    });
  });

  describe('POST /api/maintenance-requests/:id/close', () => {
    it('should close a maintenance request', (done) => {
      request(server)
        .post('/api/maintenance-requests/1/close')
        .expect(200, done);
    });
  });

  describe('Error Handling', () => {
    it('should handle errors while loading requests', (done) => {
      sinon.stub(db, 'get').throws(new Error('Failed to load requests')); // Simulate an error
      request(server)
        .get('/api/maintenance-requests')
        .expect(500, done); // Expect 500 for internal server error
    });
  });

  afterEach(() => {
    sinon.restore(); // Restore the original functions
  });
});
