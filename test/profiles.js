const { assert } = require('chai');
const restler = require('restler');
const sinon = require('sinon');

const skylabGenesis = require('../lib/skylabGenesis');

const API_KEY = 'API_CLIENT_TEST_KEY';

describe('Skylab Genesis API client', () => {
  let client;

  before((done) => {
    client = skylabGenesis(API_KEY);

    done();
  });

  describe('profiles', () => {
    describe('listProfiles', () => {
      it('should return the profiles', (done) => {
        const stub = sinon.stub(restler, 'get').returns({
          once: sinon.stub().yields([{ id: 1 }], {}),
        });

        client.listProfiles({}, (err, result) => {
          assert.equal(result.length, 1);

          stub.restore();

          done();
        });
      });
    });

    describe('createProfile', () => {
      it('should return the created profile', (done) => {
        const stub = sinon.stub(restler, 'postJson').returns({
          once: sinon.stub().yields({ id: 1 }, {}),
        });

        client.createProfile({}, (err, result) => {
          assert.equal(result.id, 1);

          stub.restore();

          done();
        });
      });
    });

    describe('getProfile', () => {
      it('should return the profile', (done) => {
        const stub = sinon.stub(restler, 'get').returns({
          once: sinon.stub().yields({ id: 1 }, {}),
        });

        client.getProfile({ id: 1 }, (err, result) => {
          assert.equal(result.id, 1);

          stub.restore();

          done();
        });
      });
    });

    describe('updateProfile', () => {
      it('should return the updated profile', (done) => {
        const stub = sinon.stub(restler, 'patchJson').returns({
          once: sinon.stub().yields({ id: 1 }, {}),
        });

        client.updateProfile({ id: 1 }, (err, result) => {
          assert.equal(result.id, 1);

          stub.restore();

          done();
        });
      });
    });

    describe('deleteProfile', () => {
      it('should return empty object', (done) => {
        const stub = sinon.stub(restler, 'del').returns({
          once: sinon.stub().yields({}, { statusCode: 204 }),
        });

        client.deleteProfile({ id: 1 }, (err, result) => {
          assert.isEmpty(result);

          stub.restore();

          done();
        });
      });
    });
  });
});
